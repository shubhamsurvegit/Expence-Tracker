const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser')
const User=require('../models/expencetrackerschema');
const e = require('express');

const bodyparserurl=bodyparser.urlencoded({extended:false})

router.get('/incometransactions',checkauth,(req,res)=>{
    User.findOne({_id:req.session.userid})
    .then((userdata)=>{
        const incometransactions=userdata.transactions.filter((i)=>i.itemvalue>0);
        res.render('showtrackerforie',{user:userdata,transactions:incometransactions});
    })
    .catch((err)=>res.send(err));
})

router.get('/expencetransactions',checkauth,(req,res)=>{
    User.findOne({_id:req.session.userid})
    .then((userdata)=>{
        const expencetransactions=userdata.transactions.filter((i)=>i.itemvalue<0);
        res.render('showtrackerforie',{user:userdata,transactions:expencetransactions});
    })
    .catch((err)=>res.send(err));
})

router.get('/alltransactions',checkauth,(req,res)=>{
    User.findOne({_id:req.session.userid})
    .then((userdata)=>{
        res.render('showtrackerforall',{user:userdata,transactions:userdata.transactions});
    })
    .catch((err)=>res.send(err));
})


router.get('/removeetransaction',checkauth,(req,res)=>{
    const id=req.query.id;
    const email=req.query.email;
    User.findOne({email:email})
    .then((userdata)=>{
        const transaction=userdata.transactions.filter((i)=>i.id==id);
        User.findOneAndUpdate({email:email},{
            expence:0,
            income:0,
            balance:userdata.balance-parseInt(transaction[0].itemvalue),
            transactions:userdata.transactions.filter((i)=>i.id!=id)
        },{new:true},(error,data)=>{
            if(error){
                res.send(err);
            }
            else{
                res.redirect('/alltransactions?email='+email);
            }
        })
    })
})

function checkauth(req,res,next){
    if(req.session.userid){
        next();
    }
    else{
        res.redirect('/user/login');
    }
}
module.exports=router;