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
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

// INITIALIZE EXPRESS
const app = express();

/**
 * -------------------------------
 *      MIDDLEWARES
 * -------------------------------
 */
app.use(morgan('dev'));

app.use(express.json());

app.use((req,res,next)=>{
    console.log('Hello from the middleware');
    next();
});

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

/**
 * -------------------------------
 *      APP LISTEN
 * -------------------------------
 */
const port = 8000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});