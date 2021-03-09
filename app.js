const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express();

app.use(bodyParser());
mongoose.connect("mongodb://localhost:27017/soal-db", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log("MongoDB Connected");
    }).catch((error) => {
        console.log(error);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
