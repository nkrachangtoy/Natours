/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const express = require('express');
const {getAllTours, getTour, createTour, updateTour, deleteTour, checkId} = require('../controllers/tourController');

const router = express.Router();

router.param('id', checkId);

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