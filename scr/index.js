// DATE AND TIME

function formatDate(time) {
  let minutes = time.getMinutes();
  let hours = time.getHours();

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
