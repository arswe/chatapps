// external imports
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const colors = require('colors');
const morgan = require('morgan');

// middlewares
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');

// internal imports
const loginRouter = require('./routers/loginRouter');
const usersRouter = require('./routers/usersRouter');
const inboxRouter = require('./routers/inboxRouter');
const connectDB = require('./config/database');

const app = express();
const server = http.createServer(app);
dotenv.config();

// database connection
connectDB();

// socket creation
const io = require('socket.io')(server);
global.io = io;

// set comment as app locals
app.locals.moment = moment;

//  morgan logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine to ejs
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// start server

server.listen(process.env.PORT, () => {
  console.log(colors.rainbow(`Server is running on port http://localhost:${process.env.PORT}`));
});
