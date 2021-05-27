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

 exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours
        // }
    })
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

