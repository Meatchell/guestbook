/**
 * Created by Administrator on 2017/3/19.
 */

const express = require('express');
let app = express();
app.set('view engine','ejs')
app.use(express.static('public'));
var router = require('./router')
app.use(router);
app.listen(3001,function(){
    console.log('服务开启成功,正在监听3001端口')
})
