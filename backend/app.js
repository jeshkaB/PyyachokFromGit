const express = require('express');
const {PORT, MONGO_URL} = require("./configs/config");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const {commentRouter, markRouter, newsRouter, restaurantRouter, userEventRouter, userRouter, authRouter,
    eventAnswerRouter
} = require('./routes')
const {ErrorMainHandler} = require("./errors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth', authRouter);
app.use('/comments', commentRouter);
app.use('/eventAnswers', eventAnswerRouter);
app.use('/marks', markRouter);
app.use('/news', newsRouter);
app.use('/restaurants', restaurantRouter);
app.use('/users', userRouter);
app.use('/userEvents', userEventRouter);

app.use ('*', (req, res, next)=> {
    next (new Error('Rout not found'))
});

app.use(ErrorMainHandler);


app.listen(PORT, ()=>{
    console.log('App listen', PORT);
    mongoose.connect(MONGO_URL)
})
