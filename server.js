/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const dotenv = require('dotenv');
// Read .env file
dotenv.config({path: './config.env'})

/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */

const app = require('./app');


/**
 * -------------------------------
 *      APP LISTEN
 * -------------------------------
 */
 const port = process.env.PORT || 8000;

 app.listen(port, ()=>{
     console.log(`App running on port ${port}`);
 });