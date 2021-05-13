// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require Body-parser as middleware
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

// Check server is running
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

//Get route
app.get('/all', function (request, response) {
  response.send(projectData);
});

//Post route
app.post('/addWeatherData', addData);

function addData (request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.feelings = request.body.feelings;
    response.end();
    console.log(projectData);
}
