const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const session = require('express-session');


const app=express();

app.set('view engine','ejs');
app.use('/htmls',express.static('htmls'));
app.use(session({secret: "Shh, its a secret!",resave:false}));

const url="mongodb://localhost:27017/expencetracker";
mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));

app.use('/user',require('./routes/authenticatetracker'))
app.use('/',require('./routes/userstracker'));

app.use('/',require('./routes/showtransactions'));



app.listen(5000,()=>console.log("Server Running.."))