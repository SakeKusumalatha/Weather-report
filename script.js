
const apiKey = "YOUR_API_KEY"; 

const cityInput = document.getElementById("cityInput");

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather(cityInput.value);
  }
});

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("city").innerText = data.name;
      document.getElementById("temp").innerText = Math.round(data.main.temp);
      document.getElementById("feel").innerText = Math.round(data.main.feels_like) + "°";
      document.getElementById("wind").innerText = data.wind.speed + " km/h";
      document.getElementById("rain").innerText = data.clouds.all + "%";

      const icon = data.weather[0].main;
      document.getElementById("icon").innerText =
        icon === "Clear" ? "☀️" :
        icon === "Clouds" ? "☁️" :
        icon === "Rain" ? "🌧" : "🌤";
    });
}

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (cityInput.value.trim() === "") {
      alert("Please enter city name");
      return;
    }
    getWeather(cityInput.value);
    getForecast(cityInput.value);
  }
});

// CURRENT WEATHER
function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found");
        return;
      }

      document.getElementById("city").innerText = data.name;
      document.getElementById("temp").innerText = Math.round(data.main.temp);
      document.getElementById("feel").innerText = Math.round(data.main.feels_like) + "°C";
      document.getElementById("wind").innerText = data.wind.speed + " km/h";
      document.getElementById("rain").innerText = data.clouds.all + "%";

      const icon = data.weather[0].main;
      document.getElementById("icon").innerText =
        icon === "Clear" ? "☀️" :
          icon === "Clouds" ? "☁️" :
            icon === "Rain" ? "🌧️" :
              icon === "Snow" ? "❄️" : "🌤️";
    })
    .catch(() => alert("Error fetching weather"));
}
function currentDetails(d){
    console.log(d);
    let html=`
         <div class="col-6">
            <h1>${d.location.name}</h1>
            <h3>${d.current.condition.text}</h3>
            <h1>${d.current.temp_c} <sup>o</sup> C</h1>
        </div>
        <div class="col-6">
            <img src="${d.current.condition.icon}" alt="icon">
        </div>
    `


    document.getElementById("currentDetails").innerHTML=html;
}


// FORECAST (5 DAYS)
function getForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      let forecastHTML = "";

      for (let i = 0; i < data.list.length; i += 8) {
        let day = data.list[i];
        let date = new Date(day.dt_txt).toDateString();

        forecastHTML += `
          <div style="border:1px solid #ccc;padding:10px;margin:5px">
            <p>${date}</p>
            <h3>${Math.round(day.main.temp)}°C</h3>
            <p>${day.weather[0].main}</p>
          </div>
        `;
      }

      document.getElementById("forecast").innerHTML = forecastHTML;
    });
 

}
  localStorage.removeItem("userId");
  localStorage.clear();
