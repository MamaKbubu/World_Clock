function updateTime() {
  // Johannesburg
  let johannesburgElement = document.querySelector("#johannesburg");
  if (johannesburgElement) {
    let johannesburgDateElement = johannesburgElement.querySelector(".date");
    let johannesburgTimeElement = johannesburgElement.querySelector(".time");
    let johannesburgTime = moment().tz("Africa/Johannesburg");

    johannesburgDateElement.innerHTML = johannesburgTime.format("MMMM Do YYYY");
    johannesburgTimeElement.innerHTML = johannesburgTime.format("h:mm:ss A");
  }

  // Lagos
  let lagosElement = document.querySelector("#lagos");
  if (lagosElement) {
    let lagosDateElement = lagosElement.querySelector(".date");
    let lagosTimeElement = lagosElement.querySelector(".time");
    let lagosTime = moment().tz("Africa/Lagos");

    lagosDateElement.innerHTML = lagosTime.format("MMMM Do YYYY");
    lagosTimeElement.innerHTML = lagosTime.format("h:mm:ss A");
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  let cityName = cityTimeZone.split("/")[1].replace("_", " ");
  let cityTime = moment().tz(cityTimeZone);

  let citiesElement = document.querySelector("#cities");

  // Remove existing city if it's already added to avoid duplicates
  let existingCity = document.querySelector(`#${cityName.toLowerCase()}`);
  if (existingCity) {
    existingCity.remove();
  }

  citiesElement.innerHTML += `
        <div class="city" id="${cityName.toLowerCase()}">
            <h2>${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            <div class="time">${cityTime.format("h:mm:ss A")}</div>
        </div>
    `;
}

// Update time every second
updateTime();
setInterval(updateTime, 1000);

// Add event listener to dropdown
document.querySelector("#city").addEventListener("change", updateCity);
