const express = require('express');
const {PORT, MONGO_URL} = require("./configs/config");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.listen(PORT, ()=>{
    console.log('App listen', PORT);
    mongoose.connect(MONGO_URL)
})
