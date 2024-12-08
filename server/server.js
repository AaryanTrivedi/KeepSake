const express = require('express');
const cors = require('cors');
const config = require('./Dependencies/config')
const jwt = require('jsonwebtoken');
const utils = require('./Dependencies/utils');
const app = express();


app.use(cors());
app.use(express.json());


app.use((req,res,next)=>{
    if( req.url == '/users/login'   ||
        req.url == '/users/register'||
        req.url == '/users/verify'  ||
        req.url == '/users/forgot'  || 
        req.url.startsWith(`/users/forgot/`)
    )
    {return next();}
    const token = req.headers.token;
    if(!token){
        res.send(utils.generateErrors('No Token'))
    }
    else{
        try{
            const payload = jwt.verify(token,config.key);
            req.user = payload;
            next();
        }
        catch(exception){
            res.send(utils.generateErrors(exception))
        }
    }
})


const postsRouter = require('./Controllers/posts');
const usersRouter = require('./Controllers/users');


app.use('/posts',postsRouter);
app.use('/users',usersRouter);


app.get('/',(req,res)=>{
    res.send('Root');
})


app.listen(4000,'0.0.0.0',()=>{
    console.log('Server started')
})
