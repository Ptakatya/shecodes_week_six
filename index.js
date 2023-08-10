var apiKey '8cd9be374c7c96c39a9fe73f4bf2f055';

document.addEventListener('DOMContentLoaded', function() {
  var searchForm = document.getElementById('searchForm');
  var cityInput = document.getElementById('cityInput');
  var cityNameDisplay = document.getElementById('cityName');
  var temperatureDisplay = document.getElementById('temperature');
  var currentLocationBtn = document.getElementById('currentLocationBtn');

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();
    if (cityName !== '') {
      getWeatherData(cityName);
    }
  });

             currentLocationBtn.addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        getWeatherDataByCoordinates(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  });
  
  async function getWeatherData(city) {
    try {
      var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      var data = await response.json();
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        alert('City not found. Please enter a valid city name.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  }

  async function getWeatherDataByCoordinates(latitude, longitude) {
    try {
      var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
      var data = await response.json();
      displayWeatherData(data);
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
                          }
  function displayWeatherData(data) {
    cityNameDisplay.textContent = data.name;
    temperatureDisplay.textContent = data.main.temp;
  }
});
