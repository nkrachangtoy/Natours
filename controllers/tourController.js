/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const Tour = require('./../models/tourModel');
 
exports.checkBody = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    if(!name || !price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next();
};


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

exports.createTour = (req,res) => {
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
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

