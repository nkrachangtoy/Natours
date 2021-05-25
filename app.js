/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const express = require('express');
const morgan = require('morgan');

/**
 * -------------------------------
 *      REQUIER ROUTES
 * -------------------------------
 */
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// INITIALIZE EXPRESS
const app = express();

/**
 * -------------------------------
 *      MIDDLEWARES
 * -------------------------------
 */
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

app.use(express.json());

// app.use((req,res,next)=>{
//     console.log('Hello from the middleware');
//     next();
// });

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


/**
 * -------------------------------
 *      ROUTES 
 * -------------------------------
 */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;