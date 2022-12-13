const express = require('express');
const {PORT, MONGO_URL} = require("./configs/config");
const mongoose = require('mongoose');
const app = express();

const {commentRouter, markRouter, newsRouter, restaurantRouter, userEventRouter, userRouter} = require('./routes')
const {ErrorMainHandler} = require("./errors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users', userRouter);


app.use ('*', (req, res, next)=> {
    next (new Error('Rout not found'))
});

app.use(ErrorMainHandler);


app.listen(PORT, ()=>{
    console.log('App listen', PORT);
    mongoose.connect(MONGO_URL)
})
