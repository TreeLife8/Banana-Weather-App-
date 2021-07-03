// DATE AND TIME

function formatDate(time) {
  let minutes = time.getMinutes();
  let hours = time.getHours();

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

formatDate(new Date());

// SEARCH LOCATION

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-location").value;
  document.querySelector("#city").innerHTML = `${city}`;
}

document
  .querySelector("#search-city-form")
  .addEventListener("submit", searchCity);

// CURRENT LOCATION

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lon);
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

document
  .querySelector("#current")
  .addEventListener("click", searchCurrentLocation);
