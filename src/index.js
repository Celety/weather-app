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
}

let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

searchTemperature(`warsaw`);
