const express = require('express');
const {body}=require('express-validator');

const feedController=require('../controllers/feeds');


const router =express.Router();
//all GET requests
router.get('/posts', feedController.getPosts);

router.get('/post/:postId',feedController.getPost);

//all POST requests

router.post('/post',[
    body('title').trim().isLength({min:3}),
    body("content").trim().isLength({min:5})
], feedController.createPost);

router.put('/edit-post/:postId',[
    body('title').trim().isLength({min:3}),
    body("content").trim().isLength({min:5})
],feedController.editPost);

router.delete('/delete-post/:postId',feedController.deletePost)
module.exports=router;