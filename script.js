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

function todayWeather(moreData) {
    var today = moreData.list[0];
    console.log(today);

    var todayWeatherContainer = $("#today");

    todayWeatherContainer.empty();

    var name = $("#search-input").val().trim();

    var cityName = $("<h3>").text(name);

    var date = (" (" + dayjs().format("DD/MM/YYYY") + ")");

    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + today.weather[0].icon + ".png");

    var temp = $("<p>").text("Temp: " + today.main.temp + " °C");

    var wind = $("<p>").text("Wind : " + today.wind.speed + " KPH");

    var humidity = $("<p>").text("Humidity : " + today.main.humidity + " %");


    todayWeatherContainer.append(cityName.append(date).append(icon), temp, wind, humidity);
}