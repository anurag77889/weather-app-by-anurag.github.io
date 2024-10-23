const apiKey = "b1c97555e43672dd23c7e6c5d9b6d1c1";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button");

function checkWeather(city) {
  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then((response) => {
      if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data) {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML =
          Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML =
          "Humidity: " + data.main.humidity + " %";
        document.querySelector(".wind").innerHTML =
          "Wind Speed: " + data.wind.speed + " km/h";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        if (data.main.temp >= 40 && data.main.temp <= 50) {
          document.body.style.backgroundColor = "#E75A2D";
          document.querySelector(".button").style.color = "#E75A2D";
          document.querySelector(".image img").src = "assets/veryhot.png";
          document.querySelector(".type").innerHTML = "Very Hot";
        } else if (data.main.temp >= 30 && data.main.temp < 40) {
          document.body.style.backgroundColor = "#FE981B";
          document.querySelector(".searchbox button").style.color = "#FE981B";
          document.querySelector(".image img").src = "assets/hot.png";
          document.querySelector(".type").innerHTML = "Hot";
        } else if (data.main.temp >= 20 && data.main.temp < 30) {
          document.body.style.backgroundColor = "#FCE7A4";
          document.querySelector(".searchbox button").style.color = "#FCE7A4";
          document.querySelector(".image img").src = "assets/warm.png";
          document.querySelector(".type").innerHTML = "Warm";
        } else if (data.main.temp >= 10 && data.main.temp < 20) {
          document.body.style.backgroundColor = "#9FDFCE";
          document.querySelector(".searchbox button").style.color = "#9FDFCE";
          document.querySelector(".image img").src = "assets/cold.png";
          document.querySelector(".type").innerHTML = "Cold";
        } else if (data.main.temp >= 0 && data.main.temp < 10) {
          document.body.style.backgroundColor = "#9AD1D8";
          document.querySelector(".searchbox button").style.color = "#9AD1D8";
          document.querySelector(".image img").src = "assets/verycold.png";
          document.querySelector(".type").innerHTML = "Very Cold";
        }
      }
    })
    .catch((error) => console.log("Error:", error));
}

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    document.querySelector(".headline").style.display = "none";
    checkWeather(searchBox.value);
  }
});

searchBtn.addEventListener("click", () => {
  document.querySelector(".headline").style.display = "none";
  checkWeather(searchBox.value);
});
