
const express = require('express');
const cors = require('cors');

const path = require("path");
require('dotenv').config();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')

const {commentRouter, markRouter, newsRouter, restaurantRouter, userEventRouter, userRouter, authRouter,
    eventAnswerRouter, generalNewsRouter, topCategoryRouter
} = require('./routes')
const {PORT, MONGO_URL} = require("./configs/config");
const {ErrorMainHandler} = require("./errors");
const {PATH_AVATAR, PATH_NEWS_PHOTO, PATH_RESTAURANT_PHOTO} = require("./constants/pathImg");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use (fileUpload({}));
app.use(express.static(path.resolve(__dirname, PATH_AVATAR))); //для передачі файлів з БД (статичних)
app.use(express.static(path.resolve(__dirname, PATH_NEWS_PHOTO)));
app.use(express.static(path.resolve(__dirname, PATH_RESTAURANT_PHOTO)));

app.use('/auth', authRouter);
app.use('/comments', commentRouter);
app.use('/eventAnswers', eventAnswerRouter);
app.use('/generalNews', generalNewsRouter);
app.use('/marks', markRouter);
app.use('/news', newsRouter);
app.use('/restaurants', restaurantRouter);
app.use('/topCategory',topCategoryRouter);
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
