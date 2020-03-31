const express = require('express');
const {body}=require('express-validator');

const router =express.Router();

const User=require('../models/user');

const authController=require('../controllers/auth');

router.post('/signup',[
    body('username').trim().isLength({min:3}).notEmpty(),
    body("password").trim().isLength({min:5}),
    body("emailId").isEmail().withMessage('please enter a valid email').custom((value,{req})=>{
        
        return User.findOne({emailId:value}).then(user=>{
            console.log(user);
            if(user){
                return Promise.reject('e-mail address already exists');

            }
        })
    }).normalizeEmail()
],authController.signUp);

module.exports=router;