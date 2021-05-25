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
 const port = 8000;

 app.listen(port, ()=>{
     console.log(`App running on port ${port}`);
 });