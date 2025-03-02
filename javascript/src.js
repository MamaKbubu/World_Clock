function updateTime() {
  let cities = document.querySelectorAll(".city");
  cities.forEach((cityElement) => {
    let timeZone = cityElement.getAttribute("data-timezone");
    let cityTime = moment().tz(timeZone);

    let dateElement = cityElement.querySelector(".date");
    let timeElement = cityElement.querySelector(".time");

    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
  });
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  let cityName = cityTimeZone.split("/")[1].replace("_", " ");
  let cityTime = moment().tz(cityTimeZone);

  let citiesElement = document.querySelector("#cities");

  // Check if city is already displayed
  let existingCity = document.querySelector(
    `.city[data-timezone="${cityTimeZone}"]`
  );
  if (existingCity) return;

  let newCityElement = document.createElement("div");
  newCityElement.classList.add("city");
  newCityElement.setAttribute("data-timezone", cityTimeZone);
  newCityElement.innerHTML = `
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      <div class="time">${cityTime.format("h:mm:ss [<small>]A[</small>]")}</div>
    `;

  citiesElement.appendChild(newCityElement);
}

// Initial time update and refresh every second
updateTime();
setInterval(updateTime, 1000);

// Listen for city selection
let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
