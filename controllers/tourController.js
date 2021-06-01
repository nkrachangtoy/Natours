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
 * @param {*} req.query returns matched tours with query
 * @returns Array of tours
 * @throws Will throw an error if no tours found
 */
exports.getAllTours = async (req, res) => {
    try {
        // Build Query
        // Filtering
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        
        // Loop through the array and delete words from the queryObj
        excludedFields.forEach(el => delete queryObj[el]);
        
        // Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Tour.find(JSON.parse(queryStr));

        // Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Execute Query
        // Get all tours with built-in method 'find()' from mongoose
        // This returns a promise   
        const tours = await query;

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
    try {
        const id = req.params.id;

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
    try {
        const id = req.params.id;
        const body = req.body;

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
    try {
        const id = req.params.id;

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

