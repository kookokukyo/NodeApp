var express = require('express');
var router = express.Router();

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

router.post('/login',function(req,res)  {
    const { username } = req.body
    const token = tokens[username]
    // mock error
    if (!token) {
        res.send({
            code: 60204,
            message: 'Account and password are incorrect.'
        });
        return false
    }
    res.send({
        code: 20000,
        data: token
    });

});

router.get('/info',function(req,res)  {
    const { token } = req.query
    const info = users[token]
    // mock error
    if (!info) {
        res.send({
            code: 50008,
            message: 'Login failed, unable to get user details.'
        });
        return false
    }
    res.send({
        code: 20000,
        data: info
    });

});

router.post('/logout',function(req,res)  {
    res.send({
        code: 20000,
        data: 'success'
    });

});

module.exports = router;