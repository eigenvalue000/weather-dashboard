
var weatherContainerEl = document.querySelector('#current-weather-container');
var citySearchInputEl = document.querySelector('#searched-city');
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");

var cities = [];
var cityFormEl = document.querySelector('#city-search-form');
var cityInputEl = document.querySelector('#city');
var pastSearchButtonEl = document.querySelector('#past-search-buttons');

// This function connects with the Openweathermap API using
// an api key and an API url. It receives a response, which is
// then converted into json.
var getCityWeather = function(city) {
    var apiKey = '6dc9c81847f0a9c22ec27263aeb0545e'
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
 

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
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

    // Get the lattitude and the longitude of the city and use these two values
    // to get the UV index of the city.
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon);
    
}

// This function takes the lattitude and longitude of a city as inputs and
// makes an API call to get the UV index corresponding to the inputs.
var getUvIndex = function(lat, lon) {
    var apiKey = '6dc9c81847f0a9c22ec27263aeb0545e';
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            displayUvIndex(data);
        });
    });
}

// This function accepts the uv index value obtained from the API call in
// the getUvIndex(lat, lon) function. The displayUvIndex() function then
// creates a div element, then a span element, and runs some logic to 
// determine an appropriate string to display in the span element 
// depending on the severity of the uv index in the city coordinates.
// Then, the uvIndexValue is appended to the div element uvIndexEl and
// finally this div element is appended to the weather container element.
var displayUvIndex = function(index) {
    var uvIndexEl = document.createElement('div');
    uvIndexEl.textContent = 'UV Index: ';
    uvIndexEl.classList = 'list-group-item';

    uvIndexValue = document.createElement('span');
    uvIndexValue.textContent = index.value;

    if (index.value <= 2) {
        uvIndexValue.classList = 'favorable';
    } else if (index.value > 2 && index.value <= 8) {
        uvIndexValue.classList = 'moderate'
    } else if (index.value > 8) {
        uvIndexValue.classList = 'severe';
    };

    uvIndexEl.appendChild(uvIndexValue);

    weatherContainerEl.appendChild(uvIndexEl);

}

// This function accepts a city name string as an input and makes an API call
// to retrieve an object that contains as a list, a list of days of previous
// weather data.
var get5Day = function(city) {
    var apiKey = '6dc9c81847f0a9c22ec27263aeb0545e';
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            display5Day(data);
        })
    })
}

// This function displays the 5 day weather forecast as 5 cards by taking as 
// an input the weather forecast data from the get5day() function
// and uses a for loop to create 5 cards and append the various weather
// forecast items to each card. The forecast uses the 3:00PM time for each
// card.
var display5Day = function(weather) {
    forecastContainerEl.textContent = '';
    forecastTitle.textContent = '5 Day Forecast:';
    
    var forecast = weather.list;
   
    for (let i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];

        var forecastEl = document.createElement('div');
        forecastEl.classList = 'card bg-primary text-light m-2';
        
        // Date element
        var forecastDate = document.createElement('h5');
        forecastDate.textContent = moment.unix(dailyForecast.dt).format('MMM D, YYYY');
        forecastDate.classList = 'card-header text-center';
        forecastEl.appendChild(forecastDate);

        // Image element
        var weatherIcon = document.createElement('img');
        weatherIcon.classList = 'card-body text-center';
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

        // Append the image to the forecast card
        forecastEl.appendChild(weatherIcon);

        // Create the temperature span element
        var forecastTempEl = document.createElement('span');
        forecastTempEl.classList = 'card-body text-center';
        forecastTempEl.textContent = dailyForecast.main.temp + ' F';

        // Append the temperature span element to the forecast card
        forecastEl.appendChild(forecastTempEl);

        // Create the humidity span element
        var forecastHumEl = document.createElement('span');
        forecastHumEl.classList = 'card-body text-center';
        forecastHumEl.textContent = dailyForecast.main.humidity + ' %';

        // Append the humidity span element to the forecast card
        forecastEl.appendChild(forecastHumEl);

        // Finally, append to the five day container
        forecastContainerEl.appendChild(forecastEl);

    }
}

// This function takes as an input a previous search city and
// prepends the pastSearch element to the pasteSearch button 
// so that a user can reaccess a previous city.
var pastSearch = function(pastSearch) {
    pastSearchEl = document.createElement('button');
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = 'd-flex w-100 btn-light border p-2';
    pastSearchEl.setAttribute('data-city', pastSearch);
    pastSearchEl.setAttribute('type', 'submit');
    pastSearchButtonEl.prepend(pastSearchEl);
}

// This function gets the data for a saved city in
// the collection of cities that are pastSearch elements
// in the above pastSearch function.
var pastSearchHandler = function(event) {
    var city = event.target.getAttribute('data-city');
    if (city) {
        getCityWeather(city);
        get5Day(city);
    }
}

// This function saves every search to local storage.
var saveSearch = function() {
    localStorage.setItem('cities', JSON.stringify(cities));
}

// This function handles the input from the search bar
// and calls the necessary functions if the input is
// a valid city.
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = '';
    } else {
        alert('Enter a city into the search field.');
    }
    saveSearch();
    pastSearch(city);
}

cityFormEl.addEventListener('submit', formSubmitHandler);
pastSearchButtonEl.addEventListener('click', pastSearchHandler);