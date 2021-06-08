/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
/**
 * -------------------------------
 *            LOGICS
 * -------------------------------
 */

exports.aliasTopTours = (req,res,next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage, price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

/**
 * Retrieve all tours
 * @GET
 * @param {*} req.query returns matched tours with query
 * @returns Array of tours
 * @throws Will throw an error if no tours found
 */
exports.getAllTours = catchAsync(async (req, res, next) => {
   // Execute Query
    // Create a new APIFeature obj and pass in 2 params: Tour obj and query string
    const features = new APIFeatures(Tour, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const tours = await features.query;

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });        
});

/**
 * Retrieve tour by Id
 * @GET
 * @param {*} req.param.id - tour id
 * @returns Tour object
 * @throws Will throw an error if no tour found
 */
exports.getTour = catchAsync(async (req, res, next) => {
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
});


/**
 * Create a new tour
 * @CREATE
 * @param {*} req.body - tour's body in JSON format 
 * @returns a new tour object
 */
exports.createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
});

/**
 * Update tour
 * @PATCH
 * @param {*} req.params.id - tour id
 * @param {*} req.body - tour's body
 * @returns updated tour object
 * @throws Will throw an error if tour or tour's body is invalid
 */
exports.updateTour = catchAsync(async (req, res, next)=>{
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
});

/**
 * Delete tour by Id
 * @DELETE
 * @param {*} req.params.id - tour id 
 * @throws Will throw an error if tour is not found
 */
exports.deleteTour = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    await Tour.findByIdAndDelete(id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

// Aggregation pipeline
exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: {ratingsAverage: {$gte: 4.5}}
        },
        {
            $group: {
                _id: {$toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            }
        },
        {
            $sort: { avgPrice: 1 }
        }
    ])

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = Number(req.params.year); // 2021

    const plan = await Tour.aggregate([
        {
            // unwind - deconstructs an array field from an input element and outputs one document for each element of the array 
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {$gte: new Date(`${year}-01-01`)},
                startDates: {$lte: new Date(`${year}-12-31`)},
            }
        },
        {
            $group: {
                _id: {$month: '$startDates'},
                numTourStarts: {$sum: 1},
                tours: {$push: '$name'}
            }
        },
        {
            $addFields: {
                month: '$_id'
            }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: {
                numTourStarts: -1
            }
        },
     //    {
     //        $limit: 12
     //    }
    ]);

    res.status(200).json({
     status: 'success',
     data: {
         plan
     }
 });
});