const apiKey = "9d7e700d778929ee72a16c7978b2e494";
const city = "Calamba City";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
const weatherDiv = document.getElementById("weather");
const forecastDiv = document.getElementById("forecast");

// current Weather JS
fetch(url)
  .then(response => response.json())
  .then(data => {
  const { name, main, weather, wind } = data;
  const { temp: kelvin, feels_like, humidity, pressure, temp_min, temp_max } = main;
  const temp = kelvin - 273.15;
  const feels = feels_like - 273.15;
  const temp_min_c = temp_min - 273.15;
  const temp_max_c = temp_max - 273.15;
  const { description, icon } = weather[0];
  const { speed } = wind;
  
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let date = new Date();
  let dateForecast = date.toDateString();
  
  weatherDiv.innerHTML = `

<section class="container">

  <div class="flex">

    <p class="temp">${temp.toFixed(0)}&#8451; 
    <br><span> Feels like ${feels.toFixed(0)}&#8451; </span></p>
    <img src="${iconUrl}" alt="${description}">
    
  </div>

  <div class="icons">

    <h2 class="heading"> Weather today in Calamba City</h2>
    <h1> <span>Right now in ${name} City, it's</span> <em>${description}.</em></h1>  
    <p> <i class="fa-solid fa-calendar-days"></i> <span>${dateForecast}</span></p> 
    <p> <i class="fa-solid fa-temperature-high"></i> High temp: <span>${temp_max_c.toFixed(0)}&#8451; </span></p>
    <p> <i class="fa-solid fa-temperature-low"></i> Low temp: <span>${temp_min_c.toFixed(0)}&#8451;</span></p>
    <p> <i class="fa-solid fa-wind"></i> Wind Speed: <span>${speed}m/s </span></p>
    <p> <i class="fa-solid fa-droplet"></i> Humidity: <span>${humidity}% </span></p>
    <p> <i class="fa-solid fa-gauge"></i> Pressure: <span>${pressure.toFixed(0)}hPa</span></p>
  
  </div>
  
  
<section>
`;

// forecast JS
fetch(url2)
  .then(response => response.json())
  .then(data => {
    const forecastData = data.list;
    let forecastHTML = "";

    for (let i = 0; i < forecastData.length; i += 8) {
      const forecast = forecastData[i];
      const { dt_txt: date, main, weather } = forecast;
      const { temp: kelvin } = main;
      const temp = kelvin - 273.15;
      const { description, icon } = weather[0];
    
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const dateForecast = new Date(date).toDateString();
    
      forecastHTML += `

      
        <section id="forecast-${i}" class="forecast">

        <div class="box">

            <div class="center">
           
            <h3 id="date-${i}" class="date"> ${dateForecast} </h3>
            <img id="icon-${i}" src="${iconUrl}" alt="${description}">
            <p id="temp-${i}" class="temp"> ${temp.toFixed(0)}&#8451;</p> 
            <p id="description-${i}" class="desc"> ${description} </p>

            </div>


        </section>
      `;
    }
    

    forecastDiv.innerHTML = forecastHTML;
  });

   
  });


// openstreetmap with weatherLayer JS
var map = L.map('map').setView([14.2120, 121.1676], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> |'
}).addTo(map);

var weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=9d7e700d778929ee72a16c7978b2e494`, {
    maxZoom: 19,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openweathermap.org">OpenWeatherMap</a>',
});
weatherLayer.addTo(map);

var select = document.createElement("select");
select.style.position = "absolute";
select.style.top = "10px";
select.style.right = "10px";
select.style.fontSize = "1.6rem";
select.style.borderRadius = ".5rem";
select.style.padding = "1rem";
select.style.zIndex = "1000";
select.onchange = function() {
  weatherLayer.setUrl(`https://tile.openweathermap.org/map/${this.value}/{z}/{x}/{y}.png?appid=9d7e700d778929ee72a16c7978b2e494`);
}

var options = {
  "temp_new": "Temperature",
  "clouds_new": "Clouds",
  "precipitation_new": "Precipitation",
  "wind_new": "Wind Speed",
  "pressure_new": "Pressure"
}

for (var key in options) {
  var opt = document.createElement("option");
  opt.style.color = "#000000"
  opt.value = key;
  opt.innerHTML = options[key];
  select.appendChild(opt);
}

document.querySelector("#map").appendChild(select);


var marker = L.marker([14.2120, 121.1676]).addTo(map);
marker.bindPopup("<center><b>Calamba City</b><br><span>City College of Calamba</span></center>").openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


// digital clock js
setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
  
}