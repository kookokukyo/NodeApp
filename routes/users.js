var express = require('express');
var router = express.Router();
var CURD_user = require('../services/user/user_CURD');

router.get('/get', function(req, res, next) {
    CURD_user.queryAll(req, res, next);
});

router.post('/add', function(req, res, next) {
    CURD_user.add(req, res, next);
});

router.post('/update', function(req, res, next) {
    CURD_user.update(req, res, next);
});

router.post('/delete', function(req, res, next) {
    CURD_user.delete(req, res, next);
});


module.exports = router;