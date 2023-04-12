const apiKey = "9d7e700d778929ee72a16c7978b2e494";
const weatherDiv = document.getElementById("searchWeather");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(event) {
  event.preventDefault(); // to prevent form from submitting
  const city = document.getElementById("city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

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
    
    weatherDiv.innerHTML = `

    <section class="container">
    
    <div class="flex">
      <p class="temp">${temp.toFixed(0)}&#8451; 
      <br><span>${feels.toFixed(0)}&#8451; Feels Like </span></p>
      <img src="${iconUrl}" alt="${description}">

    </div>

     <div class="icons">

        <h2 class="heading"> Weather today in ${name}</h2>
        <h1> <span>Right now in ${name}, it's</span> <em>${description}.</em></h1>  
        <p> <i class="fa-solid fa-temperature-high"></i> High temp: <span>${temp_max_c.toFixed(0)}&#8451; </span></p>
        <p> <i class="fa-solid fa-temperature-low"></i> Low temp: <span>${temp_min_c.toFixed(0)}&#8451;</span></p>
        <p> <i class="fa-solid fa-wind"></i> Wind Speed: <span>${speed}m/s </span></p>
        <p> <i class="fa-solid fa-droplet"></i> Humidity: <span>${humidity}% </span></p>
        <p> <i class="fa-solid fa-gauge"></i> Pressure: <span>${pressure.toFixed(0)}hPa</span></p>
  
     </div>

      <section>

    
    `;
   
  });

});

// digital clock js
setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}


