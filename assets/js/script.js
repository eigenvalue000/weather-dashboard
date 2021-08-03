
var weatherContainerEl = document.querySelector('#current-weather-container');
var citySearchInputEl = document.querySelector('#searched-city')


// This function connects with the Openweathermap API using
// an api key and an API url. It receives a response, which is
// then converted into json.
var getCityWeather = function(city) {
    var apiKey = '6dc9c81847f0a9c22ec27263aeb0545e'
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
 

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            // console.log(data);
            // console.log(data.clouds);
            // console.log(data.coord);
            // console.log(data.main);
            
            // console.log(data.sys);
            // console.log(data.weather);
            // console.log(data.wind);

            displayWeather(data, data.name);
        });
    });

  

}

var displayWeather = function(weather, searchCity) {
    // Clear previous content by setting the weatherContainer element
    // to an empty string ''. Also, sets the citySearchInput h2 element
    // to the name of the city that is currently being searched for.
    weatherContainerEl.textContent = '';
    citySearchInputEl.textContent = searchCity;

    console.log(weather.main);

    // Create date element by creating a span HTML element. The text of
    // this newly created element is then a string using the weather.dt.value
    // property of the weather object. Moment.js is used to format the weather.dt.value
    // into a user readable format. This element is then appended to the child of the 
    // citySearchInput h2 element, which is the newly created span element currentDate.
    // Will change this if I have time to be more readable.
    var currentDate = document.createElement('span');
    currentDate.textContent = ' ' + moment(weather.dt.value).format('MMM D, YYYY');
    citySearchInputEl.appendChild(currentDate);

    // Create an image element by creating an img HTML image element. The attribute src is
    // set to an API call to an icon property of the weather element which gets
    // a .png image file. The citySearchInput element's child, which is img, is then appended
    // with the weather icon picture.
    var weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);

    // Create a span element to hold temperature data. The weather object has a main.temp
    // property which is added to the text content of the temperature span element.
    // This temperature span element is added to the class list that is defined in the HTML
    // as list-group-item. The weather container is then appended with this temperature span
    // element.
    var temperatureEl = document.createElement('span');
    temperatureEl.textContent = 'Temperature: ' + weather.main.temp + ' F';
    temperatureEl.classList = 'list-group-item';
    weatherContainerEl.appendChild(temperatureEl);

    // Create a span element to hold humidity data. The weather object has a main.humidity
    // property which is added to the text content of the humidity span element.
    // This humidity span element is added to the class list that is defined in the HTML
    // as list-group-item. The weather container is then appended with this humidity span
    // element.
    var humidityEl = document.createElement('span');
    humidityEl.textContent = 'Humidity: ' + weather.main.humidity + ' %';
    humidityEl.classList = 'list-group-item';
    weatherContainerEl.appendChild(humidityEl);

    // Create a span element to hold wind data. The weather object has a wind.speed
    // property which is added to the text content of the wind span element.
    // This wind span element is added to the class list that is defined in the HTML
    // as list-group-item. The weather container is then appended with this wind span
    // element.
    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = 'Wind Speed: ' + weather.wind.speed + ' MPH';
    windSpeedEl.classList = 'list-group-item';
    weatherContainerEl.appendChild(windSpeedEl);
    
}

getCityWeather('sacramento')