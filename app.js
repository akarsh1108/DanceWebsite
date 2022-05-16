const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port =80;
const mongoose = require('mongoose');
//It is a middle layer we have not used here in this project
const bodyparser=require('body-parser');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

//Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var Contact = mongoose.model('Contact', contactSchema);
//Express specefic stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded());//this help us simply bring form data to express

//Pug specefic stuff
app.set('view engine','pug');//Set the template engine as pug
app.set('views',path.join(__dirname,'views'));//Set the views directory the names of directory should be same or else it won't work 

//EndPoints
//If we want to send parameters
app.get('/',(req,res)=>{
    const params ={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params ={}
    res.status(200).render('contact.pug',params);
})

//To store data in mongodb database
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>res.status(400).send("Item was not saved to the database"));
   // res.status(200).render('contact.pug');
})
//Start the server
app.listen(port ,()=>{console.log(`The application started successfully on port ${port}`)});