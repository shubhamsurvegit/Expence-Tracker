const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser')
const bcrypt=require('bcryptjs');
const User=require('../models/expencetrackerschema')



const bodyparserurl=bodyparser.urlencoded({extended:false})

router.get('/login',(req,res)=>res.render('trackerlogin'));
router.get('/register',(req,res)=>res.render('trackerregister',{data:false}));

router.post('/register',bodyparserurl,(req,res)=>{
    const errors=[];
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        conpassword:req.body.conpassword,
        balance:0,
        expence:0,
        income:0,
        transactions:[
            
        ]
    }
    if(!data.name || !data.email || !data.password || !data.conpassword){
        errors.push({msg:"Please fill in all fields"});
    }
    if(req.body.password!==req.body.conpassword){
        errors.push({msg:"Passwords do not match"});
    }
    if(errors.length>0){
        res.render('trackerregister',{errors:errors,data:data})
    }
    else{
        User.findOne({email:data.email})
        .then((userdata)=>{
            if(userdata){
                errors.push({msg:"User already registered"});
                res.render('trackerregister',{errors:errors,data:data})
            }
            else{
                bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(data.password,salt,(err,hash)=>{
                    if (err) throw err;
                    data.password=hash;
                    User.create(data)
                    .then((data)=>{
                        req.session.userid=data._id;
                        res.redirect('/users? name='+data.name+'&email='+data.email);
                    })
                    .catch((err)=>res.send(err));
                }))
            }
        })
    }
})


router.post('/login',bodyparserurl,(req,res)=>{
    const errors=[];
    if(!req.body.email || !req.body.password){
        errors.push({msg:"Please fill in all fields"})
        res.render('trackerlogin',{errors:errors})
    }
    else{
        User.findOne({email:req.body.email})
        .then((userdata)=>{
            if(userdata){
                bcrypt.compare(req.body.password,userdata.password,(err,isMatch)=>{
                    if (err) throw err;
                    if(isMatch){
                        req.session.userid=userdata._id;
                        res.redirect('/usersfromlogin?email='+req.body.email);
                    }
                    else{
                        errors.push({msg:"Incorrect Password"})
                        res.render('trackerlogin',{errors:errors})
                    }
                })
            }
            else{
                errors.push({msg:"User does not exist"})
                res.render('trackerlogin',{errors:errors})
            }
        })
        .catch((err)=>res.send(err))
    }
})

router.get('/logout',(req,res)=>{
    delete req.session.userid;
    const errors=[];
    errors.push({msg:"You are logged out"})
    res.redirect('/user/login');
    res.render('trackerlogin',{errors:errors});
})

module.exports=router;