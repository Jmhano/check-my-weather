var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var locationContainerEl = document.querySelector("#locations-container");
var locationSearchTerm = document.querySelector("#location-search-term");

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getWeather(city);

    // clear old content
    locationContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a location");
  }
};

var getWeather = function (user) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={51f87de30811bee1ff96fdfa26701e2d}";
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayLocations(data, user);
        });
      } else {
        alert("Error: Location Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

var displayLocations = function (locations, searchTerm) {
  // check if api returned any locations
  if (locations.length === 0) {
    locationContainerEl.textContent = "No locations found.";
    return;
  }

  locationSearchTerm.textContent = searchTerm;

  // loop over locations
  for (var i = 0; i < locations.length; i++) {
    // format location name
    var locationName = locations[i].owner.login + "/" + locations[i].name;

    // create a link for each location
    var locationEl = document.createElement("a");
    locationEl.classList =
      "list-item flex-row justify-space-between align-center";
    locationEl.setAttribute(
      "href",
      "./single-location.html?location=" + locationName
    );

    // create a span element to hold location name
    var titleEl = document.createElement("span");
    titleEl.textContent = locationName;

    // append to container
    locationEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current location has issues or not
    if (locations[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        locations[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    locationEl.appendChild(statusEl);

    // append container to the dom
    locationContainerEl.appendChild(locationEl);
  }
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
