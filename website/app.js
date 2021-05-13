/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'XXXXX';

// Async post function
const postData = async (url='', data={}) => {
  const response = await fetch(url, {
    method: 'POST',
    //credentials: 'same-origin',
    credentials: 'include',
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
let month = d.getMonth() +1;
let newDate = d.getDate()+'.'+month+'.'+ d.getFullYear();

// Listen for click of button
document.getElementById('generate').addEventListener('click', performAction);

// Async fetch that gets info for the URL to get weather data
function performAction(e) {
  const cityName =  document.getElementById('city').value;
  const userFeelings = document.getElementById('feelings').value;
  getTemp(baseURL, cityName, apiKey)
  .then(function(data){
    console.log(data);
    postData('http://localhost:3000/addWeatherData', {temperature:data.main.temp, date:newDate, feelings:userFeelings});
    // Calls update user interface function
    updateUI();
  });
}

//Async post that creates the URL and returns data
const getTemp = async (baseURL, cityName, apiKey)=>{
  const response = await fetch(baseURL + cityName + '&appid=' + apiKey + '&units=metric');
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
    const request = await fetch('http://localhost:3000/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `${allData.temperature} C`;
        document.getElementById('content').innerHTML = `You feel: ${allData.feelings}`;
    }
    catch (error) {
        console.log("error", error);
    }
}
