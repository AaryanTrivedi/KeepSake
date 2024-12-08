const express = require('express');

const utils = require('../Dependencies/utils');
const pool = require('../Dependencies/db');
const router = express.Router();

router.get('/my',(req,res)=>{
    const query = `SELECT id,title,message,likes,createTime,updateTime,isPublic FROM posts WHERE userId = ? and status = 2`;
    pool.query(query,[req.user['id']],(err,posts)=>{
        if(err){
           res.send(utils.generateErrors(err));
        }
        else{
            if(posts.length===0){
                res.send(utils.generateErrors("User has no posts"));
            }
            else{
                res.send(utils.generateSuccess(posts));
            }
        }
    });
})

router.get('/archived',(req,res)=>{
    const query = `SELECT id,title,message,likes,createTime,updateTime,isPublic FROM posts WHERE userId = ? and status = 1`;
    pool.query(query,[req.user['id']],(err,posts)=>{
        if(err){
           res.send(utils.generateErrors(err));
        }
        else{
            if(posts.length===0){
                res.send(utils.generateErrors("User has no posts"));
            }
            else{
                res.send(utils.generateSuccess(posts));
            }
        }
    });
})

router.get('/all',(req,res)=>{
    const query = `SELECT title,message,likes,createTime,updateTime FROM posts WHERE isPublic = 1 and status =2 order by createTime desc`;
    pool.query(query,[],(err,posts)=>{
        if(err){
           res.send(utils.generateErrors(err));
        }
        else{
            if(posts.length===0){
                res.send(utils.generateErrors("No posts available"));
            }
            else{
                res.send(utils.generateSuccess(posts));
            }
        }
    });
})

router.post('/add',(req,res)=>{
    const {title, message} = req.body;
    const query = `INSERT INTO posts(title,message,userId) VALUES(?,?,?)`;
    pool.execute(query,[title,message,req.user.id],(err,ok)=>{res.send(utils.generateResult(err,ok))});
})

router.patch('/delete/:id',(req,res)=>{
    const id = req.params['id']
    const query = `UPDATE posts SET status = 0 WHERE id = ? and userId = ?;`
    pool.execute(query,[id,req.user.id],(err,ok)=>{res.send(utils.generateResult(err,ok))});
})

router.patch('/archive/:id',(req,res)=>{
    const id = req.params['id']
    const query = `UPDATE posts SET status = 1 WHERE id = ? AND userId = ?`;
    pool.execute(query,[id,req.user.id],(err,ok)=>{res.send(utils.generateResult(err,ok))});
})

router.patch('/unarchive/:id',(req,res)=>{
    const id = req.params['id']
    const query = `UPDATE posts SET status = 2 WHERE id = ? AND userId = ?`;
    pool.execute(query,[id,req.user.id],(err,ok)=>{res.send(utils.generateResult(err,ok))});
})

router.patch('/public/:id',(req,res)=>{
    const id = req.params['id']
    const query = `UPDATE posts SET isPublic = 1 WHERE id = ? AND userId = ?`;
    pool.execute(query,[id,req.user.id],(err,ok)=>{res.send(utils.generateResult(err,ok))});
})

router.patch('/private/:id',(req,res)=>{
    const id = req.params['id']
    const query = `UPDATE posts SET isPublic = 0 WHERE id = ? AND userId = ?`;
    pool.execute(query,[id,req.user.id],(err,ok)=>{res.send(utils.generateResult(err,ok))});
})

router.patch('/like/:id',(req,res)=>{
    const id = req.params['id']
    const query = `UPDATE posts SET likes = likes+1 WHERE id = ?;`
    pool.execute(query,[id],(err,ok)=>{res.send(utils.generateResult(err,ok))});
})

module.exports = router;