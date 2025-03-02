function updateTime() {
  // Johannesburg Time
  let johannesburgElement = document.querySelector("#johannesburg");
  if (johannesburgElement) {
    let johannesburgDateElement = johannesburgElement.querySelector(".date");
    let johannesburgTimeElement = johannesburgElement.querySelector(".time");
    let johannesburgTime = moment().tz("Africa/Johannesburg");

    johannesburgDateElement.innerHTML = johannesburgTime.format("MMMM Do YYYY");
    johannesburgTimeElement.innerHTML = johannesburgTime.format("h:mm:ss A");
  }

  // Lagos Time
  let lagosElement = document.querySelector("#lagos");
  if (lagosElement) {
    let lagosDateElement = lagosElement.querySelector(".date");
    let lagosTimeElement = lagosElement.querySelector(".time");
    let lagosTime = moment().tz("Africa/Lagos");

    lagosDateElement.innerHTML = lagosTime.format("MMMM Do YYYY");
    lagosTimeElement.innerHTML = lagosTime.format("h:mm:ss A");
  }
}

// Call updateTime every second to refresh the clock
updateTime();
setInterval(updateTime, 1000);
