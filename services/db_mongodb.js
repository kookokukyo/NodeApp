// 引入模块
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

var options = {
    db_user: "kookokukyo",
    db_pwd: "84825877Hh!",
    db_host: "127.0.0.1",
    db_port: 27017,
    db_name: "nodeDB",
    useNewUrlParser: true
};

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err) {
    if (err) {　 console.log('Connection Error:' + err)　 } else {　 console.log('Connection success!') }
})

// 得到数据库连接句柄
let dbHandle = mongoose.connection


//通过 数据库连接句柄，监听mongoose数据库成功的事件
dbHandle.on('open', function(err) {
    if (err) {
        console.log('数据库连接失败');
        throw err;
    }
    console.log('数据库连接成功')
})

let MongoDbAction = {}
let filename = path.join(path.dirname(__dirname).replace('app', ''), 'services/table.json');
let tabConf = JSON.parse(fs.readFileSync(path.normalize(filename)));
/**
 * 
 * @param table_name 表名
 */
MongoDbAction.getConnection = function(table_name) {
    //定义表数据结构
    var userModel = new mongoose.Schema(tabConf[table_name], {
            versionKey: false //去除： - -v
        })
        // 将表的数据结构和表关联起来
        // var productModel=mongoose.model('anyname',表的数据结构，表名)
    var client = mongoose.model(table_name, userModel, table_name);
    return client;
};


/**
 * 插入单条数据
 * @param table_name 表名
 * @param insertData 插入的数据
 * @param callback 回调方法
 */
MongoDbAction.insertData = function(table_name, insertData, callback) {
    var node_model = this.getConnection(table_name);
    node_model.insertOne(insertData, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};


/**
 * 插入多条数据
 * @param table_name 表名
 * @param insertData 插入的数据
 * @param callback 回调方法
 */

MongoDbAction.insertMany = function(table_name, insertData, callback) {
    var node_model = this.getConnection(table_name);
    node_model.insertMany(insertData, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 查询单条数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
MongoDbAction.findOne = function(table_name, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.findOne(conditions, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 根据_id查询指定的数据
 * @param table_name 表名
 * @param _id 可以是字符串或 ObjectId 对象。
 * @param callback 回调方法
 */
MongoDbAction.findById = function(table_name, _id, callback) {
    var node_model = this.getConnection(table_name);
    node_model.findById(_id, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 查询数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param fields 待返回字段
 * @param callback 回调方法
 */
MongoDbAction.find = function(table_name, conditions, fields, callback) {
    var node_model = this.getConnection(table_name);
    node_model.find(conditions, fields || null, {}, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 连写查询
 * @param table_name 表名
 * @param conditions 查询条件 {a:1, b:2}
 * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
 * @param callback 回调方法
 */
MongoDbAction.where = function(table_name, conditions, options, callback) {
    var node_model = this.getConnection(table_name);
    node_model.find(conditions)
        .select(options.fields || '')
        .sort(options.sort || {})
        .limit(options.limit || {})
        .exec(function(err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
};

/**
 * 连接查询 $lookup 来实现左连接。
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
MongoDbAction.findOne = function(table_name, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.aggregate([{
        $lookup: {
            from: 'products', // 右集合
            localField: 'product_id', // 左集合 join 字段
            foreignField: '_id', // 右集合 join 字段
            as: 'orderdetails' // 新生成字段（类型array）
        }
    }], function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 更新单条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"name":'jackson影琪'}; 
 * @param updateStr 更新数据 {$set: { "url" : "https://www.cnblogs.com/jackson-zhangjiang" }};
 * @param callback 回调方法
 */
MongoDbAction.updateOne = function(table_name, conditions, updateStr, callback) {
    var node_model = this.getConnection(table_name);
    node_model.updateOne(conditions, updateStr, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 更新多条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"type":'1'}; 
 * @param updateStr 更新数据 {$set: { "url" : "https://www.cnblogs.com/jackson-zhangjiang" }};
 * @param callback 回调方法
 */
MongoDbAction.updateMany = function(table_name, conditions, updateStr, callback) {
    var node_model = this.getConnection(table_name);
    node_model.updateMany(conditions, updateStr, function(err, res) {
        if (err) {
            callback(err);
        } else {
            console.log(res.result.nModified + " 条文档被更新");
            callback(null, res);
        }
    });
};

/**
 * 删除单条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"name":'jackson影琪'}; 
 * @param callback 回调方法
 */
MongoDbAction.deleteOne = function(table_name, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.deleteOne(conditions, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 删除条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"type":'1'}; 
 * @param callback 回调方法
 */
MongoDbAction.deleteMany = function(table_name, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.deleteMany(conditions, function(err, res) {
        if (err) {
            callback(err);
        } else {
            console.log(obj.result.n + " 条文档被删除");
            callback(null, res);
        }
    });
};

module.exports = MongoDbAction;