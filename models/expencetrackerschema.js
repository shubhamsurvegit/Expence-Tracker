const mongoose=require('mongoose');
const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true      
    },
    password:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true,
    },
    expence:{
        type:Number,
        required:true,
    },
    income:{
        type:Number,
        required:true,
    },
    transactions:[{
            itemname:String,
            itemvalue:Number
    }],
    date:{
        type:Date,
        default:Date.now
    }
})


const User=mongoose.model("users",Userschema);

module.exports=User;