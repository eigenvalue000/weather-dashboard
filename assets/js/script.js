
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
    // Clear previous content
    weatherContainerEl.textContent = '';
    citySearchInputEl.textContent = searchCity;

    console.log(weather.coord);

    // Create date element
    var currentDate = document.createElement('span');
    currentDate.textContent = ' ' + moment(weather.dt.value).format('MMM D, YYYY');
    citySearchInputEl.appendChild(currentDate);

}
console.log(getCityWeather('sacramento'))