// REQUIRES //
const express = require('express');
// INITIALIZE EXPRESS
const app = express();

// ROUTES
app.get('/api/v1/tours', (req, res) => {
    
})

// app.get('/', (req, res) => {
//     res.status(200).json({message: "Hello from the server side!", app: "Natours"});
// });

const port = 8000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});