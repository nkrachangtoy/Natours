/**
 * ---------------------
 *      REQUIRE
 * ---------------------
 */
const express = require('express');
const fs = require('fs');

// INITIALIZE EXPRESS
const app = express();

/**
 * ---------------------
 *      MIDDLEWARES
 * ---------------------
 */
app.use(express.json());

// READ FILE FROM DATA FOLDER
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * --------------------
 *      ROUTES
 * --------------------
 */

// Get All tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
});

// Get tour by id
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);

    // Handling invalid tour Id
    if(id > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
});

// Create new tour
app.post('/api/v1/tours', (req,res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    // Object.assign allows us to create a new object by merging it to the existing file
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    // Persist into the file
    // Use writeFile() here because we can never block the event
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        // Send newly created as response
        // status(201) means created
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
});

// Update tour by Id
app.patch('/api/v1/tours/:id', (req,res)=>{

    // Handling invalid tour Id
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }
    // Placehoulder code block for updating tour
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour>'
        }
    })
})  


/**
 * --------------------
 *      APP LISTEN
 * --------------------
 */
const port = 8000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});