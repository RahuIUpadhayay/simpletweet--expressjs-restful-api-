const {validationResult}=require('express-validator');
const Post=require('../models/post')
exports.getPosts=(req,res,next)=>{
    Post.find().then(posts=>{
        
        res.status(200).json({posts:posts})
    }).catch(err=>{
        console.log(err)
    });
}
     


exports.createPost=(req,res,next)=>{
    
   const errors=validationResult(req);
   if (!errors.isEmpty()){
       const error=new Error('validation failed');
       error.statusCode=422;
       throw error;
   }

   const title=req.body.title;
   const content=req.body.content;
   const post= new Post({
       title:title,
       content:content,
       creator:{
           name:"rahul"
           
       }

   });
   post.save()
   .then(result =>{
    res.status(201).json({
        message:'POST CREATED SUCCESSFULLY!!',
        post:result
    });
}).catch(err=>{
     if(!err.statusCode){
         err.statusCode=500;
     }
     next(err);
   })};

exports.getPost=(req,res,next)=>{
    const postId =req.params.postId;
    Post.findById(postId).
    then(post=>{
        if(!post){
             error.statusCode = 404;
        }
        res.status(200).json({
            post:post
        })

    }).
    catch(err=>{
       if(!err.statusCode){
           err.statusCode=500;
       }
    });
}
 
exports.editPost=(req,res,next)=>{
    const postId=req.params.postId;
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        const error=new Error('validation failed');
        error.statusCode=422;
        throw error;
    }

    const title=req.body.title;
    const content=req.body.content;
   
    Post.findById(postId).then(post=>{
        if(!post){
            const error =new Error('could not find the post');
            error.statusCode=404;
            throw error
        }
        post.title=title;
        post.content=content;
        return post.save();
        
    }).then(result=>{
        res.status(200).json({message:"Post updated",post:result})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
        );
};

exports.deletePost=(req,res,next)=>{
    const postId= req.params.postId;
    Post.findById(postId).then(post=>{
        if(!post){
        const error =new Error('could not find the post');
        error.statusCode=404;
        throw error;
        }
        return Post.findByIdAndDelete(post)
        .then(result=>{
        res.status(200).json({message:"Post deleted",post:result})
        })
        .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })})}