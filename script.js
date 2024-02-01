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

function fiveDayForecast(moreData) {
    var forecasrEl = $("#forecast");

    forecasrEl.empty();

    var forecastTitle = $("<h4>").text("5-Day Forecast:").addClass("mt-1 h4 form-label");

    var forecastElementRow = $("<div>").addClass("row align-items-center d-flex justify-content-center");

    forecasrEl.append(forecastTitle, forecastElementRow);

    for (let index = 0; index < moreData.list.length; index += 8) {

        var forecastElement = moreData.list[index];

        var forecastColumn = $("<div>").addClass("col-md-2 bg-info text-white p-1 border");

        var date = $("<h5>").text(" (" + dayjs(forecastElement.dt_txt).format("DD/MM/YYYY") + ")");

        var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastElement.weather[0].icon + ".png");

        var temp = $("<p>").text("Temp: " + forecastElement.main.temp + " °C");

        var wind = $("<p>").text("Wind : " + forecastElement.wind.speed + " KPH");

        var humidity = $("<p>").text("Humidity : " + forecastElement.main.humidity + " %");

        forecastColumn.append(date, icon, temp, wind, humidity);

        forecastElementRow.append(forecastColumn);

    }


}