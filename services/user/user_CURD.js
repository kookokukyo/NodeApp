var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var config = require('../../conf/db');
var $sql = require('./userSql');

var pool = mysql.createPool(config.mysql);

var resData = {
    code: null,
    status: null,
    message: null,
    data: null
}

module.exports = {

    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                if (err) {
                    res.send({
                        code: 200,
                        status: "failure",
                        message: "查询失败！",
                        data: err
                    });
                } else {
                    res.send({
                        code: 200,
                        status: "success",
                        message: "查询成功！",
                        data: result
                    });
                }
                connection.release();
            });
        });
    },

    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body;

            connection.query($sql.insert, [param.name, param.age], function(err, result) {
                if (err) {
                    res.send({
                        code: 200,
                        status: "failure",
                        message: "新增失败！",
                        data: err
                    });
                } else {
                    res.send({
                        code: 200,
                        status: "success",
                        message: "新增成功！",
                        data: result
                    });
                }

                // 释放连接 
                connection.release();
            });
        });
    },

    update: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body;

            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                if (err) {
                    res.send({
                        code: 200,
                        status: "failure",
                        message: "更新失败！",
                        data: err
                    });
                } else {
                    res.send({
                        code: 200,
                        status: "success",
                        message: "更新成功！",
                        data: result
                    });
                }

                connection.release();
            });
        });
    },

    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var id = req.body.id;
            connection.query($sql.delete, id, function(err, result) {
                if (err) {
                    res.send({
                        code: 200,
                        status: "failure",
                        message: "删除失败！",
                        data: err
                    });
                } else {
                    res.send({
                        code: 200,
                        status: "success",
                        message: "删除成功！",
                        data: result
                    });
                }
                connection.release();
            });
        });
    }
};