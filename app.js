// REQUIRES //
const express = require('express');
const fs = require('fs');

// INITIALIZE EXPRESS
const app = express();

// READ FILE FROM DATA FOLDER
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTES
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'sucess',
        results: tours.length,
        data: {
            tours
        }
    })
});

// app.get('/', (req, res) => {
//     res.status(200).json({message: "Hello from the server side!", app: "Natours"});
// });

const port = 8000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});