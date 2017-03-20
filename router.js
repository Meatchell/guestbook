/**
 * Created by Administrator on 2017/3/19.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'Mectall'
})
router.get('/',function(req,res){
    //res.send('首页 get')
    connection.query('select * from articles',function(err,rows,fields){
        if(err)throw err;
        console.log(rows)
        res.render('index',{list:rows});
    })
})

router.route('/add').get(function(req,res){
    //res.send('添加页面 get');
    res.render('add')
}).post(upload.any(),function(req,res){
    //res.send('添加页面 post')

    let fields = req.body;
    connection.query(`insert into articles(title,content) values("${fields.title}","${fields.content}")`,function(err,result){
        console.log(result);
        res.redirect('/')
    })
});
router.route('/edit').get(function(req,res){
    //res.send('编辑页面 get')
    let id = req.query.id;
    connection.query(`select * from articles where id = ${id} limit 1`,function(err,rows,fields){
        if(err)throw err;
        res.render('edit',{id:rows[0].id,title:rows[0].title,content:decodeURIComponent(rows[0].content)})
    })
    //res.render('edit')
}).post(function (req,res){
    //res.send('编辑页面 post')
    let fields =req.body;
    connection.query(`updata articles set title="${fields.title}",content="${encodeURIComponent(fields.content)}" where id = ${fields.id}`,function(err,res){
        if(err) throw err;
        res.redirect('/')
    })
})
router.get('/delete',function(req,res){
    //res.send('删除 get')

    let id = req.query.id;
    connection.query(`delete from articles where id = ${id}`,function(err,rows,fields){
        if(err) throw err;
        res.redirect('/')
    })
})

module.exports = router