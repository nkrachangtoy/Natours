/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

// Read .env file
dotenv.config({path: './.env'})

const db = process.env.MONGO_DB;

// Mongoose connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {console.log('DB Connection successful!')});



/**
 * -------------------------------
 *      APP LISTEN
 * -------------------------------
 */
 const port = process.env.PORT || 8000;

 app.listen(port, ()=>{
     console.log(`App running on port ${port}`);
 });