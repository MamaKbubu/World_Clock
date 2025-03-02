function updateTime() {
  // Ensure the Moment Timezone library is working
  if (typeof moment === "undefined" || typeof moment.tz === "undefined") {
    console.error("Moment Timezone is not properly loaded.");
    return;
  }

  // Get all cities in the DOM and update their time
  let cities = document.querySelectorAll(".city");
  cities.forEach((cityElement) => {
    let timeZone = cityElement.getAttribute("data-timezone");
    let cityTime = moment().tz(timeZone);

    let dateElement = cityElement.querySelector(".date");
    let timeElement = cityElement.querySelector(".time");

    // Update the date and time for each city
    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
  });
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
  }
  cityTimeZone = moment.tz.guess();
  if (!cityTimeZone) return;

  // Extract city name and time from the selected timezone
  let cityName = cityTimeZone.split("/")[1].replace("_", " ");
  let cityTime = moment().tz(cityTimeZone);

  let citiesElement = document.querySelector("#cities");

  // Clear the existing cities to show only the selected one
  citiesElement.innerHTML = `
    <div class="city" data-timezone="${cityTimeZone}">
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        <div class="time">${cityTime.format(
          "h:mm:ss [<small>]A[</small>]"
        )}</div>
    </div>
  `;
}

// Initial time update and refresh every second
updateTime();
setInterval(updateTime, 1000);

// Listen for city selection change
let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
