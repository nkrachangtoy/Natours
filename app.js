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

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

module.exports = app;