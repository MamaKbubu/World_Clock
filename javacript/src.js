function updateTime() {
  let cityElements = document.querySelectorAll(".city");
  cityElements.forEach((cityElement) => {
    let timeZone = cityElement.getAttribute("data-timezone");
    let currentTime = moment().tz(timeZone);

    cityElement.querySelector(".date").innerHTML =
      currentTime.format("MMMM Do YYYY");
    cityElement.querySelector(".time").innerHTML =
      currentTime.format("h:mm:ss A");
  });
}

function updateCity(event) {
  let selectedTimeZone = event.target.value;
  if (!selectedTimeZone) return; // Prevent adding empty options

  let cityName = selectedTimeZone.split("/")[1].replace("_", " ");
  let currentTime = moment().tz(selectedTimeZone);

  let citiesContainer = document.getElementById("cities");

  // Check if the city is already displayed to avoid duplicates
  let existingCity = document.querySelector(
    `.city[data-timezone="${selectedTimeZone}"]`
  );
  if (existingCity) return;

  let newCityElement = document.createElement("div");
  newCityElement.classList.add("city");
  newCityElement.setAttribute("data-timezone", selectedTimeZone);
  newCityElement.innerHTML = `
        <h2>${cityName}</h2>
        <div class="date">${currentTime.format("MMMM Do YYYY")}</div>
        <div class="time">${currentTime.format("h:mm:ss A")}</div>
    `;

  citiesContainer.appendChild(newCityElement);
}

// Update time every second
updateTime();
setInterval(updateTime, 1000);

// Handle city selection
document.getElementById("city").addEventListener("change", updateCity);
