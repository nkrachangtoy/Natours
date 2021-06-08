/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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

// ROUTE ERROR HANDLER
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;