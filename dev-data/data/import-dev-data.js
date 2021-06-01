/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
 
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

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!')
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// Delete all data from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted data!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importData();
} else if (process.argv[2] === '--delete'){
    deleteData();
}