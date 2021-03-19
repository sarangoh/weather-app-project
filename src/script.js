function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
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
  let month = months[date.getMonth()];
  let currentdate = date.getDate();
  let year = date.getFullYear();
  return `${day} ${month} ${currentdate}, ${year} `;
}

function getTime(time) {
  let hours = time.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = time.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
}
let now = new Date();
let nowTime = document.querySelector("#time");
nowTime.innerHTML = getTime(now);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  fahrenheitTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  cityElement.innerHTML = response.data.name;

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class ="col-3">
  <ul>
    <h3>
    ${formatHours(forecast.dt * 1000)}
    </h3>
    <img src= "http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"/>
 <strong>H: ${Math.round(forecast.main.temp_max)}°</strong> | L: ${Math.round(
      forecast.main.temp_min
    )}°
  <li>Clear</li>
</ul>
</div>
`;
  }
}

function search(city) {
  let apiKey = "6b4aa4963a9fa2b5cecf2be8622f70ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitlink.classList.remove("active");
  celsiuslink.classList.add("active");

  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let farenheitTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemp);

search("San Francisco");
