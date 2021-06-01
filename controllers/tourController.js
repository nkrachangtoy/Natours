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
    // Get all tours with built-in method 'find()' from mongoose
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

/**
 * Create a new tour
 * @CREATE
 * @param {*} req.body - tour's body in JSON format 
 * @returns a new tour object
 */
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
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

/**
 * Update tour
 * @PATCH
 * @param {*} req.params.id - tour id
 * @param {*} req.body - tour's body
 * @returns updated tour object
 * @throws Will throw an error if tour or tour's body is invalid
 */
exports.updateTour = async (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                updatedTour
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
 * Delete tour by Id
 * @DELETE
 * @param {*} req.params.id - tour id 
 * @throws Will throw an error if tour is not found
 */
exports.deleteTour = async (req,res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

