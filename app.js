const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const tweetsRouter = require('./routes/tweets');
const repliesRouter = require('./routes/replies');
const cors = require("cors");

const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tweets', tweetsRouter);
app.use('/replies', repliesRouter);


module.exports = app;
