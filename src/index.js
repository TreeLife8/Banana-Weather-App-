// DATE AND TIME
function formatDate(timeStamp) {
  let time = new Date(timeStamp);
  let minutes = time.getMinutes();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hours}:${minutes}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  document.querySelector(
    "#day-time"
  ).innerHTML = `<strong>${day}</strong> ${currentTime}`;
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[time.getMonth()];
  let date = time.getDate();
  let year = time.getFullYear();
  let currentDate = `${date} ${month} ${year}`;
  document.querySelector("#date").innerHTML = `${currentDate}`;
}

// FORMAT BACKGROUND COLOUR
function changeBackground(time) {
  let hours = time.getHours();
  if (hours > 5 && hours <= 7) {
    document.body.style.background =
      "linear-gradient(90.4deg, rgb(253, 240, 233) 2.2%, rgb(255, 194, 203) 96.2%)";
  }
  if (hours > 7 && hours < 10) {
    document.body.style.background =
      "linear-gradient(90.1deg, rgb(167, 220, 225) 11.2%, rgb(217, 239, 242) 88.9%)";
  }
  if (hours >= 17 && hours <= 19) {
    document.body.style.background =
      "linear-gradient(270.4deg, rgb(253, 240, 233) 2.2%, rgb(255, 194, 203) 96.2%)";
  }
  if (hours > 19 && hours <= 24) {
    document.body.style.background =
      "linear-gradient(270deg, #09203f 0%, #537895 100%)";
    document.querySelector("#gitHubLink").style.color = "white";
  }
  if (hours > 0 && hours <= 5) {
    document.body.style.background =
      "linear-gradient(90deg, #09203f 0%, #537895 100%)";
    document.querySelector("#gitHubLink").style.color = "white";
  }
}

//  FORECAST DATA
function getForecast(coordinates, unit) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `3fb188379e6ffcf616e7cdbd010c6434`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);
}

// WEATHER DATA
function showWeather(response) {
  // CITY NAME
  let city = response.data.name;
  document.querySelector("#city").innerHTML = `${city}`;
  // CURRENT FORECAST DISCRIPTION
  celciusTemp = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML = Math.round(celciusTemp);
  document.querySelector("#forcast").innerHTML =
    response.data.weather[0].description;

  // ICON
  let icon = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.querySelector("#current-icon").setAttribute("src", iconUrl);
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);

  // MIN & MAX TEMPS
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  // CONDITIONS
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )} %`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )} °C`;
  document.querySelector("#windspeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  let unit = `metric`;

  // LAST UPDATED
  formatDate(response.data.dt * 1000);
  getForecast(response.data.coord, unit);
}

// AXIOS SEARCH FUNCTION
function search(city) {
  let unit = `metric`;
  let apiKey = `3fb188379e6ffcf616e7cdbd010c6434`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
search("Sydney");

// FORECAST UNIT CONVERSION
function changeForecastUnits(city) {
  let unit = `imperial`;
  let apiKey = `3fb188379e6ffcf616e7cdbd010c6434`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(updatingUnitLocation);
}

function updatingUnitLocation(response) {
  let unit = `imperial`;
  getForecast(response.data.coord, unit);
}

// UNIT CONVERSION
function convertUnitFehren(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(
    (celciusTemp * 9) / 5 + 32
  );
  celcius.classList.remove("active");
  fehren.classList.add("active");
  let city = document.getElementById("city").innerText;
  changeForecastUnits(city);
}
function convertUnitCelcius(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(celciusTemp);
  fehren.classList.remove("active");
  celcius.classList.add("active");
}
function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

// SEARCH LOCATION
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-location").value;
  document.querySelector("#city").innerHTML = `${city}`;
  search(city);
}

// CURRENT LOCATION
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = `metric`;
  let apiKey = `3fb188379e6ffcf616e7cdbd010c6434`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = date.getDay();
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `<div class="col-2 weekForcast">
        <span class="maxfocastTemp" id="forecast-max-temp"><strong>${Math.round(
          forecastDay.temp.max
        )}</strong>°</span>
        <span class="minfocastTemp" id="forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
          <div id="forecast-icon">
            <img
              class="icon"
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="${forecastDay.weather[0].main}"
             />
            </div>
          <div id="forecast-day">${formatDay(forecastDay.dt)}</div>
        </div>`;
    }
  });
  forecastHTML += `</div>`;
  document.querySelector("#week-forecast").innerHTML = forecastHTML;
}

document
  .querySelector("#current")
  .addEventListener("click", searchCurrentLocation);
document
  .querySelector("#search-city-form")
  .addEventListener("submit", searchCity);

let celciusTemp = null;

let fehren = document.querySelector("#fehren");
fehren.addEventListener("click", convertUnitFehren);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertUnitCelcius);

changeBackground(new Date());

let time = new Date();
