/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const fs = require('fs');
 
// READ FILE FROM DATA FOLDER
const tours = JSON.parse(
     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req,res,next,val) => {
    // console.log(`Tour Id is: ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    next();
};

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
        results: tours.length,
        data: {
            tours
        }
    })
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

exports.createTour = (req,res) => {
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

exports.updateTour = (req,res)=>{
    // Placehoulder code block for updating tour
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour>'
        }
    });
};

exports.deleteTour = (req,res) => {
    // Placehoulder code block for updating tour
    res.status(204).json({
        status: 'success',
        data: null
    });
};

