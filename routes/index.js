var express = require('express');
var router = express.Router();

router.get('/',function(req,res)  {
    res.send({
        code: 200,
        status: "success",
        message: "APP启动成功！",
        data: []
    });
});

module.exports = router;