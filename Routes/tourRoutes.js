/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const express = require('express');
const fs = require('fs');

// READ FILE FROM DATA FOLDER
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const router = express.Router();

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
};

/**
 * -------------------------------
 *      ROUTES HANDLERS
 * -------------------------------
 */

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);

    // Handling invalid tour Id
    if(id > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const createTour = (req,res) => {
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
};

const updateTour = (req,res)=>{
    // Handling invalid tour Id
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    // Placehoulder code block for updating tour
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour>'
        }
    });
};

const deleteTour = (req,res) => {
    // Handling invalid tour Id
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    // Placehoulder code block for updating tour
    res.status(204).json({
        status: 'success',
        data: null
    });
};

/**
 * -------------------------------
 *      ROUTER
 * -------------------------------
 */

router
    .route('/')
    .get(getAllTours)
    .post(createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


module.exports = router;