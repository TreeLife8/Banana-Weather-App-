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

// WEEK FORCAST DAYS

let time = new Date();

let shortDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let dayOne = time.getDay() + 1;
if (dayOne > 6) {
  document.querySelector("#day-one-day").innerHTML =
    shortDays[time.getDay() - 6];
} else {
  document.querySelector("#day-one-day").innerHTML =
    shortDays[time.getDay() + 1];
}

let dayTwo = time.getDay() + 2;
if (dayTwo > 6) {
  document.querySelector("#day-two-day").innerHTML =
    shortDays[time.getDay() - 5];
} else {
  document.querySelector("#day-two-day").innerHTML =
    shortDays[time.getDay() + 2];
}

let dayThree = time.getDay() + 3;
if (dayThree > 6) {
  document.querySelector("#day-three-day").innerHTML =
    shortDays[time.getDay() - 4];
} else {
  document.querySelector("#day-three-day").innerHTML =
    shortDays[time.getDay() + 3];
}

let dayFour = time.getDay() + 4;
if (dayFour > 6) {
  document.querySelector("#day-four-day").innerHTML =
    shortDays[time.getDay() - 3];
} else {
  document.querySelector("#day-four-day").innerHTML =
    shortDays[time.getDay() + 4];
}

let dayFive = time.getDay() + 5;
if (dayFive > 6) {
  document.querySelector("#day-five-day").innerHTML =
    shortDays[time.getDay() - 2];
} else {
  document.querySelector("#day-five-day").innerHTML =
    shortDays[time.getDay() + 5];
}

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

// WEATHER DATA
