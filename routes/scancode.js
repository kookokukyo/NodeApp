const express = require('express');
const router = express.Router();
const axios = require('axios');
const CircularJSON = require('circular-json');

const service = axios.create({
    baseURL: "http://feedback.api.juhe.cn",
    timeout: 5000 // request timeout
})

router.get('/',function(req,res)  {
    const ISBN = req.query.code
    service.get('/ISBN?sub='+ISBN+'&key=254f3d89c821b8f81fddb7e7d6dc7c76').then(response=>{
        let resData = JSON.parse(CircularJSON.stringify(response))
        if (resData.data.error_code===0){
            res.send({
                code: 20000,
                status: "success",
                message: "图书信息查询成功！",
                data:resData.data.result
            });
        }else{
            res.send({
                code: 20001,
                status: "success",
                message: "图书信息查询失败！",
                data: {}
            });
        }
    }).catch(err=>{
        res.send({
            code: 20001,
            status: "error",
            message: "图书信息查询失败！",
            data: err
        });
    })
});

module.exports = router;