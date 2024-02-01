var APIKey = "5eac79e569460d81d76fc4d3f59f89fc";

var quordinatesAPIURL = "http://api.openweathermap.org/geo/1.0/direct?q="

var cityHistory = [];

function weatherData(city) {

    var queryURLCoordinates = quordinatesAPIURL + city + "&limit=5&appid=" + APIKey;

    fetch(queryURLCoordinates)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
                console.log(quordinatesAPIURL);
                console.log(data);
                var lat = data[0].lat;
                var lon = data[0].lon;

                var weatherForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=";

                var queryURL = weatherForecastURL + lat + "&lon=" + lon + "&units=metric&appid=" + APIKey;

                fetch(queryURL)
                    .then(function(response) {
                        return response.json();
                    }).then(function(moreData) {
                        console.log(queryURL);
                        console.log(moreData);

                        todayWeather(moreData);
                        fiveDayForecast(moreData);
                        addToHistory(city);



                    });


            }

        )
}