const express = require('express');
const sendMail = require('../Dependencies/mail.js');

const crypto = require('crypto-js');

const jwt = require('jsonwebtoken')
const utils = require('../Dependencies/utils.js');
const pool = require('../Dependencies/db.js');
const config = require('../Dependencies/config.js');
const router = express.Router();



//User register
router.post('/register',(req,res)=>{
    const otp = Math.floor(Math.random()*1000000);
    const {firstname,lastname,username,email,password} = req.body;
    const encrypted = String(crypto.MD5(password));
    const query = `INSERT INTO users(firstname,lastname,username,email,password,otp) VALUES(?,?,?,?,?,?)`;

    pool.execute
    (
        query,
        [firstname,lastname,username,email,encrypted,otp],
        (err,ok)=>{
            if(err){
                return res.send(utils.generateErrors(err));
            }
            else{
                sendMail(
                    email,
                    "Just one step away",
                    `<h2>Hey ${firstname},</h2><br />
                    <p>Please verify your account by entering the provided OTP in the given link</p><br />
                    <h3>One-Time-Password : ${otp}</h3>
                    <br/>
                    <a href="">link</a>
                    <br/>
                    <div>Thank you,</div>
                    <div>from Skrylla</div>
                    <br/>
                    <h6>This is an auto-generated code. If you did not request registeration please ignore</h6>
                    `,
                    (err,ok) => {res.send(utils.generateResult(err,ok))}
                )
            }
        }
    );
})


//User verification using OTP
router.patch('/verify',(req,res)=>{
    const {email,otp} = req.body;
    const query = 'UPDATE users SET isActive = 1 WHERE email = ? AND otp = ?';
    pool.execute(query,[email,otp],(err,ok)=>{
        if(err){
            res.send(utils.generateErrors(err));
        }
        else{
            if(ok.affectedRows === 0){
                res.send(utils.generateErrors("Internal Error"));
            }
            else{
                res.send(utils.generateSuccess(ok));
            }
        }
    })
})


//User login
router.post('/login',(req,res)=>{
    const {username, password} = req.body;
    const encrypted = String(crypto.MD5(password));
    const query = `SELECT id,firstname,lastname,email,isActive FROM users WHERE username = ? AND password = ?`;
    pool.query(query,[username,encrypted],(err,ok)=>{
        if(err){
            res.send(utils.generateErrors(err))
        }
        else{
            if(ok.length === 0){
                res.send(utils.generateErrors("No users were found"));
            }
            else if(ok[0].isActive === 0){
                res.send(utils.generateErrors("User is not active"))
            }
            else
            {
                const {id,firstname,lastname,email} = ok[0];
                const update = 'UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?';
                pool.execute(update,[id],(err,ok)=>{
                    if(err){
                        res.send(utils.generateErrors(err))
                    }
                    else{
                        const payload = {id,firstname,lastname,username,email};
                        const token = jwt.sign(payload,config.key);
                        res.send(utils.generateSuccess(token));
                    }
            });
            }
        }
    });
})

//Forgot Password Request
router.post('/forgot',(req,res)=>{
    const {email} = req.body;
    const query = 'SELECT id,firstname FROM users WHERE email = ?';
    pool.query(query,[email],(err,result)=>{
      if(err){
        res.send(utils.generateErrors(err));
      }
      else{
        if(result.length===0){
            res.send(utils.generateErrors('This email is not registered'))
        }
        else{
            const {firstname,id} = result[0];
            sendMail(
                email,
                "Forgot Password",
                `<h2>Hey ${firstname},</h2><br />
                <p>A forgot password request has been generated for this account</p><br />
                <h3>Please use the below link to change your password</h3>
                <br/>
                <a href="http://localhost:4000/users/forgot/${encodeURIComponent(btoa(id))}">Click Here</a>
                <br/>
                <div>Thank you,</div>
                <div>from Skrylla</div>
                <br/>
                <h6>This is an auto-generated code. If you did not request forgot password please ignore</h6>
                `,
                (err,ok) => {res.send(utils.generateResult(err,ok))}
            )
        }
      }
    })
})

//Forgot password update
router.patch('/forgot/:id',(req,res)=>{
    try{
        const uid = req.params.id;
        const id = atob(decodeURIComponent(uid))
        const {password} = req.body;
        const encrypted = String(crypto.MD5(password));
        const query = 'UPDATE users SET password = ? WHERE id = ?';
        pool.execute(query,[encrypted,id],(err,ok)=>{res.send(utils.generateResult(err,ok))})
    }
    catch(exception){
        res.send(utils.generateErrors(exception));
    }
})

//Change Password
router.patch('/change/password',(req,res)=>{
    try{
        const id = req.user['id'];
        const {password,updatedPassword} = req.body;
        const encrypted = String(crypto.MD5(password));
        const updateEncrypt = String(crypto.MD5(updatedPassword));
        const query = 'UPDATE users SET password = ? WHERE id = ? AND password = ?';
        pool.execute(query,[updateEncrypt,id,encrypted],(err,ok)=>{res.send(utils.generateResult(err,ok))});
    }catch(ex){
        res.send(utils.generateErrors(ex));
    }
})

router.patch('/account/delete',(req,res)=>{
    try{
        const id = req.user['id'];
        const {password} = req.body;
        const encrypted = String(crypto.MD5(password));
        const query = 'UPDATE users SET isActive = 0 WHERE id = ? and password = ?';
        pool.execute(query,[id,encrypted],(err,ok)=>{res.send(utils.generateResult(err,ok))});
    }catch(ex){
        res.send(utils.generateErrors(ex));
    }
})

router.get('/edit',(req,res)=>{
    const id = req.user['id'];
    const query = "SELECT firstname,lastname,username,bio,email FROM users WHERE id = ?";
    pool.query(query,[id],(err,ok)=>{
        if(err){
            res.send(utils.generateErrors(err))
        }
        else if(ok.length === 0)
        {
            res.send(utils.generateErrors('Internal Error'))
        }
        else{
            res.send(utils.generateSuccess(ok));
        }
    })
})

router.put('/edit',(req,res)=>{
    const id = req.user['id'];
    const {firstname,lastname,bio} = req.body;
    const query = "UPDATE users set firstname = ? ,lastname = ? ,bio = ?,updateTime = CURRENT_TIMESTAMP WHERE id = ?;";
    pool.query(query,[firstname,lastname,bio,id],(err,ok)=>{res.send(utils.generateResult(err,ok));})
})

module.exports = router;