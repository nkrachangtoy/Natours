/**
 * -------------------------------
 *      REQUIRE
 * -------------------------------
 */
const express = require('express');

const router = express.Router(); 

/**
 * -------------------------------
 *      ROUTES HANDLERS
 * -------------------------------
 */

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

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;