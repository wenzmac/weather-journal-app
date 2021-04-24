/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '747d3e3f8a33563d0855e9834afa3c34';

// Async post function
const postData = async (url='', data={}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();

// Listen for click of button
document.getElementById('generate').addEventListener('click', performAction);

// Async fetch that gets info for the URL to get weather data
function performAction(e) {
  const cityName =  document.getElementById('city').value;
  const userComment = document.getElementById('comment').value;
  getTemp(baseURL, cityName, apiKey)
  .then(function(data){
    console.log(data);
    // Creates the URL for API
    postData('/addWeatherData', {temperature:data.main.temp, date:newDate, comment:userComment});
    // Calls update user interface function
    updateUI();
  });
}

//Async post that creates the URL and posts data
const getTemp = async (baseURL, cityName, apiKey)=>{
  const response = await fetch(baseURL + cityName + '&appid=' + apiKey);
  try {
    const data = await response.json();
      console.log(data);
      return data;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
  }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('comment').innerHTML = allData.comment;
    }
    catch (error) {
        console.log("error", error);
    }
}
