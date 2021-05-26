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

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ' A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

/**
 * -------------------------------
 *      APP LISTEN
 * -------------------------------
 */
 const port = process.env.PORT || 8000;

 app.listen(port, ()=>{
     console.log(`App running on port ${port}`);
 });