// Function to update the time for all cities
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

// Function to update the time for a selected city
function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess(); // Get user's local timezone
  }
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

// Function to reset the page to show all cities
function resetPage() {
  let citiesElement = document.querySelector("#cities");

  citiesElement.innerHTML = `
    <div class="city" data-timezone="Africa/Johannesburg">
        <h2>Johannesburg</h2>
        <div class="date"></div>
        <div class="time"></div>
    </div>
    <div class="city" data-timezone="Africa/Lagos">
        <h2>Lagos</h2>
        <div class="date"></div>
        <div class="time"></div>
    </div>
    <div class="city" data-timezone="America/New_York">
        <h2>New York</h2>
        <div class="date"></div>
        <div class="time"></div>
    </div>
    <div class="city" data-timezone="Europe/London">
        <h2>London</h2>
        <div class="date"></div>
        <div class="time"></div>
    </div>
    <div class="city" data-timezone="Asia/Tokyo">
        <h2>Tokyo</h2>
        <div class="date"></div>
        <div class="time"></div>
    </div>
  `;
  // Re-trigger the time update for all cities
  updateTime();
}

// Initial time update and refresh every second
updateTime();
setInterval(updateTime, 1000);

// Listen for city selection change
let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

// Listen for the "All Cities" link to reset the page
let allCitiesLink = document.querySelector("#allCitiesLink");
allCitiesLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  resetPage(); // Reset to show all cities
});
