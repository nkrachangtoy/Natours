/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const Tour = require('./../models/tourModel');
 
/**
 * -------------------------------
 *            LOGICS
 * -------------------------------
 */

/**
 * Retrieve all tours
 * @GET
 * @returns Array of tours
 * @throws Will throw an error if no tours found
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

/**
 * Retrieve tour by Id
 * @GET
 * @param {*} req.param.id - tour id
 * @returns Tour object
 * @throws Will throw an error if no tour found
 */
exports.getTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id);
        // This would work the same way
        // Tour.findOne({_id: req.params.id}) 

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
         res.status(404).json({
            status: 'fail',
            message: err
        });
    }
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

