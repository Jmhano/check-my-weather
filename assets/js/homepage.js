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
    getGeo(city);

    // clear old content
    locationContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a location");
  }
};

var getGeo = function (city) {
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=51f87de30811bee1ff96fdfa26701e2d&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        return response.json();
      } else {
        alert("Error: Location Not Found");
      }
    })
    .then(function (data) {
      console.log(data);
      getWeather(data);
      getCurrent(data);
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

var getWeather = function (latlon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latlon[0].lat +
    "&lon=" +
    latlon[0].lon +
    "&appid=51f87de30811bee1ff96fdfa26701e2d&units=imperial";
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayLocations(data);
        });
      } else {
        alert("Error: Location Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

getCurrent = function (latlon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latlon[0].lat +
    "&lon=" +
    latlon[0].lon +
    "&appid=51f87de30811bee1ff96fdfa26701e2d&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        return response.json();
      } else {
        alert("Error: Location Not Found");
      }
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      alert("Unable to get current forecast");
    });
};

var displayLocations = function (locations, city) {
  // check if api returned any locations
  if (locations.list.length === 0) {
    locationContainerEl.textContent = "No locations found.";
    return;
  }

  locationSearchTerm.textContent = city;

  // loop over locations
  for (var i = 0; i < locations.list.length; i += 8) {
    // format location name
    var day = locations.list[i];
    console.log(day);
  }
  var locationEl = document.createElement("a");
  locationEl.classList =
    "list-item flex-row justify-space-between align-center";

  var locationEl = document.createElement("span");
  locationEl.textContent = city;

  locationEl.appendChild(locationEl);

  var statusEl = document.createElement("span");
  statusEl.classList = "flex-row align-center";
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
