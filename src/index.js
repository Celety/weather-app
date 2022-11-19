let now = new Date();

// Changing date

let date = now.getDate();

let fullDays = [
  "Sunday",
  "Monday",
  "Tuesdat",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let fullDay = fullDays[now.getDay()];

let fullMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let fullMonth = fullMonths[now.getMonth()];

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${fullDay} ${date}, ${fullMonth}`;

// Changing hour

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = `${hours}:${minutes}`;

//Weekly forecast

function displayWeeklyForecast(response) {
  console.log(response.data.daily);
  let weeklyForecastElement = document.querySelector(`.forecastList`);

  let weeklyForecastHTML = "";

  let weekDays = ["THU", "FRI", "SAT", "SUN", "MON"];
  weekDays.forEach(function (day) {
    weeklyForecastHTML =
      weeklyForecastHTML +
      `<li class="list-group-item weeklyList">
            <div class="weekly-forecast-day">${day}</div>
            <div class="weekly-forecast-icon">🌨</div>
            <div class="weekly-forecast-temp">-2°C</div>
          </li>`;
  });

  weeklyForecastElement.innerHTML = weeklyForecastHTML;
}

//Hourly forecast
function displayHourlyForecast() {
  let hourlyForecastElement = document.querySelector(`.hourly`);

  let hourlyForecastHTML = "";

  let hours = ["18;00", "19;00", "20;00", "21;00", "22;00"];
  hours.forEach(function (hour) {
    hourlyForecastHTML =
      hourlyForecastHTML +
      `<li class="list-group-item weatherHourly">
              <div class="hourly-forecast-hour">${hour}</div>
              <div class="hourly-forecast-icon">🌨</div>
              <div class="hourly-forecast-icon">-5°C</div>
            </li>`;
  });

  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

displayHourlyForecast();

//Collecting weekly forecast data
function getWeeklyForecast(coordinates) {
  let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeeklyForecast);
}

//Changing city and temperature

function showTemp(response) {
  document.querySelector("#current-city").innerHTML =
    response.data.name.toUpperCase();
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  //Changing icon
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  //Unit conversion?
  celsiusTemp = response.data.main.temp;

  //Weather description
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  //Wind speed
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `windspeed: ${response.data.wind.speed} km/h`;

  //Humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;

  //Sending coordinates info and calling weekly forecast function
  getWeeklyForecast(response.data.coord);
}

function searchTemperature(newCity) {
  let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-new-value").value;
  searchTemperature(newCity);
}

let city = document.querySelector("#change-city");
city.addEventListener("submit", changeCity);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchTemperature(`warsaw`);
