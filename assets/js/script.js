



var getCityWeather = function(city) {
    var apiKey = '6dc9c81847f0a9c22ec27263aeb0545e'
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data)
        });
    });

}

getCityWeather('Sacramento')