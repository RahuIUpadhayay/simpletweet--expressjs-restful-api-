const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const userSchema= new Schema({
    username:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }]

});

module.exports=mongoose.model('User',userSchema);
