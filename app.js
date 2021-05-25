/**
 * ---------------------
 *      REQUIRE
 * ---------------------
 */
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

// INITIALIZE EXPRESS
const app = express();

/**
 * ---------------------
 *      MIDDLEWARES
 * ---------------------
 */
app.use(morgan('dev'));

app.use(express.json());

app.use((req,res,next)=>{
    console.log('Hello from the middleware');
    next();
});

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


// READ FILE FROM DATA FOLDER
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * -------------------------------
 *      ROUTES HANDLERS
 * -------------------------------
 */

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

const getAllUsers = (req, res) => {
    // Placeholder for code block
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const getUser = (req, res) => {
    // Placeholder for code block
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const createUser = (req, res) => {
    // Placeholder for code block
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const updateUser = (req, res) => {
    // Placeholder for code block
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const deleteUser = (req, res) => {
    // Placeholder for code block
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

/**
 * -------------------------------
 *      ROUTES 
 * -------------------------------
 */

const tourRouter = express.Router();
const userRouter = express.Router(); 

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
/**
 * --------------------
 *      APP LISTEN
 * --------------------
 */
const port = 8000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});