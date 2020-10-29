const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser')
const User=require('../models/expencetrackerschema')
const data=require('./authenticatetracker');
const { v1: uuidv1 } = require('uuid');




const bodyparserurl=bodyparser.urlencoded({extended:false})

router.get('/users',(req,res)=>{
    res.render('indextracker',{username:Object.values(req.query)[0],useremail:Object.values(req.query)[1]});
})

router.get('/usersfromlogin',checkauth,(req,res)=>{
    const email=req.query.email;
    User.findOne({email:email})
    .then((userdata)=>{
        res.render('indextracker2',{user:userdata,useremail:email})
    })
    .catch((err)=>res.send(err));
})

router.get('/removetransaction',checkauth,(req,res)=>{
    const email=Object.values(req.query)[0];
    const id=Object.values(req.query)[1];
    User.findOne({email:email})
    .then((userdata)=>{
        const transaction=userdata.transactions.filter((i)=>i.id==id);
        User.findOneAndUpdate({email:email},{
            expence:0,
            income:0,
            balance:userdata.balance-parseInt(transaction[0].itemvalue),
            transactions:userdata.transactions.filter((i)=>i.id!=id)
        },({new:true}),(error,data)=>{
            if(error){
                res.send(error);
            }
            else{
                res.render('indextracker2',{user:data,useremail:email})
            }
        })
    })
    .catch((err)=>res.send(err))
    
})

router.post('/api/users',checkauth,bodyparserurl,(req,res)=>{
    if(req.body.text && req.body.amount){
        const email=Object.values(req.query)[0];
        User.findOne({email:email})
        .then((userdata)=>{
            const transaction={
                id:uuidv1().slice(0,2)+uuidv1().slice(20,22),
                itemname:req.body.text,
                itemvalue:req.body.amount
            };
            userdata.transactions.push(transaction);
            User.findOneAndUpdate({email:email},{
                balance:userdata.balance+parseInt(req.body.amount),
                expence:req.body.amount<0?req.body.amount:0,
                income:req.body.amount>0?req.body.amount:0,
                transactions:userdata.transactions
            },{new:true},(error,data)=>{
                if(error){
                    res.send(error) 
                }
                else{
                    res.render('indextracker2',{user:data,useremail:email});
                }
            })
        })
        .catch((err)=>res.send(err))
    }
    else{
        const email=Object.values(req.query)[0];
        User.findOne({email:email})
        .then((userdata)=>{
            const errors=[];
            const error={msg:"Enter all the fields"};
            errors.push(error)
            res.render('indextracker2',{user:userdata,useremail:email,errors:errors});
        })
        .catch((err)=>res.send(err));
    }
});

function checkauth(req,res,next){
    if(req.session.userid){
        next();
    }
    else{
        res.redirect('/user/login');
    }
}


module.exports=router;
