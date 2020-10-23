const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');


const app=express();

app.set('view engine','ejs');
app.use('/htmls',express.static('htmls'));

const url="mongodb://localhost:27017/expencetracker";
mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));

app.use('/user',require('./routes/authenticatetracker'))
app.use('/',require('./routes/userstracker'));





app.listen(5000,()=>console.log("Server Running.."))