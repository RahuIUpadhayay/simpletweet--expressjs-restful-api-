const express = require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path = require('path');

const app = express();

const feedRoutes=require('./routes/feed');
const authRoutes=require('./routes/auth');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname,'images')));



app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use('/feed',feedRoutes);
app.use('/auth',authRoutes);

app.use((error,req,res,next)=>{
   const status=error.statusCode||500;
    const messages=error.message;
    res.status(status).json({message:messages});
    

});

mongoose.connect('connection url').
then(res=>{
    app.listen(3000);
}).catch(
    err=>{
    console.log(new Error("Unable to connect to Database"));
    throw new Error("Unable to connect to Database");
});
