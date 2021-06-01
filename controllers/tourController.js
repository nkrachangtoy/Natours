/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const Tour = require('./../models/tourModel');
 
/**
 * -------------------------------
 *      ROUTES HANDLERS
 * -------------------------------
 */

 exports.getAllTours = async (req, res) => {
    // Get all tours with built-in method 'find()'  from mongoDB
    // This returns a promise
    try {
        const tours = await Tour.find();
    
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
        
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        // data: {
        //     tour
        // }
    });
};

exports.createTour = async (req,res) => {
    try {
        // create() returns promises
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'placeholder for error handling'
        });
    }
};

exports.updateTour = (req,res)=>{
    // Placehoulder code block for updating tour
    res.status(200).json({
        status: 'success',
        // data: {
        //     tour: '<Updated tour>'
        // }
    });
};

exports.deleteTour = (req,res) => {
    // Placehoulder code block for deleting tour
    res.status(204).json({
        status: 'success',
        data: null
    });
};

