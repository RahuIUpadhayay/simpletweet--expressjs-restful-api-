const User=require('../models/user');
const {validationResult}=require('express-validator');
const bcrypt =require('bcryptjs');

exports.signUp=(req,res,next)=>{
  
    const errors =validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        const error=new Error('validation failed');
        error.statusCode=422;
        throw error;
    }
    const username=req.body.username;
    
    const emailId=req.body.emailId;
    const password=req.body.password;
    bcrypt.hash(password,12).
    then(hspassword=>{
        const user=new User({
            username:username,
            emailId:emailId,
            password:hspassword,
        });
        return user.save();
    }).then(result=>{
        res.status(201).json({
            message:'user created',
            result:result.id
           
        });
    })
    .catch(error=>{
        if (!error.statusCode){
            errors.statusCode=500;
        }
        next(error);
    });

};
