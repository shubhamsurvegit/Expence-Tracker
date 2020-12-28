const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser')
const User=require('../models/expencetrackerschema')
const data=require('./authenticatetracker');
const { v1: uuidv1 } = require('uuid');

const bodyparserurl=bodyparser.urlencoded({extended:false})


router.get('/home',checkauth,(req,res)=>{
    User.findOne({_id:req.session.userid})
    .then((userdata)=>{
        res.render('indextracker2',{user:userdata})
    })
    .catch((err)=>res.send(err));
})

router.post('/removetransaction',bodyparserurl,(req,res)=>{
    User.findOne({_id:req.session.userid})
    .then((userdata)=>{
        const transaction=userdata.transactions.filter((i)=>i.id==req.body.id);
        console.log(transaction)
        User.findOneAndUpdate({_id:req.session.userid},{
            expence:transaction[0].itemvalue<0?userdata.expence-transaction[0].itemvalue:userdata.expence,
            income:transaction[0].itemvalue>0?userdata.income-transaction[0].itemvalue:userdata.income,
            balance:userdata.balance-parseInt(transaction[0].itemvalue),
            transactions:userdata.transactions.filter((i)=>i.id!=req.body.id)
        },({new:true}),(error,data)=>{
            if(error){
                res.send(error);
            }
        })
    })
    .catch((err)=>res.send(err))
    
})

router.post('/add',checkauth,bodyparserurl,(req,res)=>{
    if(req.body.itemname && req.body.itemvalue){
        User.findOne({_id:req.session.userid})
        .then((userdata)=>{
            const transaction={
                itemname:req.body.itemname,
                itemvalue:req.body.itemvalue
            };
            userdata.transactions.push(transaction);
            User.findOneAndUpdate({_id:req.session.userid},{
                balance:userdata.balance+parseInt(req.body.itemvalue),
                expence:req.body.itemvalue<0?userdata.expence+parseInt(req.body.itemvalue):userdata.expence,
                income:req.body.itemvalue>0?userdata.income+parseInt(req.body.itemvalue):userdata.income,
                transactions:userdata.transactions
            },{new:true},(error,data)=>{
                if(error){
                    res.send(error) 
                }
            })
        })
        .catch((err)=>res.send(err))
    }
    // else{
    //     console.log("AS")
    //     const email=Object.values(req.query)[0];
    //     User.findOne({_id:req.session.userid})
    //     .then((userdata)=>{
    //         const errors=[];
    //         const error={msg:"Enter all the fields"};
    //         errors.push(error)
    //         res.render('indextracker2',{user:userdata,errors:errors});
    //     })
    //     .catch((err)=>res.send(err));
    // }
});

function checkauth(req,res,next){
    if(req.session.userid){
        next();
    }
    else{
        console.log(req.url);
        res.redirect('/user/login');
    }
}


module.exports=router;
