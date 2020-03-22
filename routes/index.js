var express = require('express');
var router = express.Router();
var MongoDB = require('../services/db_mongodb.js');

router.put('/user', function(req, res) {
    var singleId = req.body.singleId; //'5c4036b04471e7c18ef8f57f'
    var tableName = req.body.tableName; //'User'
    let data = {
            httpCode: 200,
            message: "查询成功！",
            data: null,
        }
        //查询一条数据
    MongoDB.find(tableName, function(err, result) {
        console.log(result);
        if (!err) {
            data.data = result
            res.status(data.httpCode).json(data);
        } else {
            data.httpCode = 500
            data.message = "查询失败！"
            data.data = err
            res.status(data.httpCode).json(data);
        }
    });
})

module.exports = router;