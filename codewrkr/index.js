const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/demo');

const user = require('./routes/users');
//Middleware 
app.use(logger('dev'));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   


//Routes
app.get('/', (req,res,next) => {
    res.status(200).json({
        messege:'your messege'
    });
});
app.use('/user',user);

//catch 404 error and forward to error handler
app.use((req,res,next) => {
    const err = new Error('mot found');
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err,req,res,next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res.status(status).json({
        error: {
            messege:error.messege
        }
    });
});

//start the server
const port  = app.get('port') || 3000;
app.listen(port , () => console.log('server listening at ', port));