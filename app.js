// REQUIRES //
const express = require('express');
// INITIALIZE EXPRESS
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello from the server side!", app: "Natours"});
});

const port = 8000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});