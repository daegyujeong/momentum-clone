const weather = document.querySelector(".js-weather");
const city = document.querySelector(".js-city");
const weatherImg = document.querySelector(".js-weatherImg");
const finedustPM10 = document.querySelector(".js-finedust-pm10");
const finedustPM2_5 = document.querySelector(".js-finedust-pm2_5");
const finedustPM10Status = document.querySelector(".js-finedust-pm10-status");
const finedustPM2_5Status = document.querySelector(".js-finedust-pm2_5-status");
const API_KEY = "ec39a77387f7ac16451fbdd237c17d0f";
const colors = ["#FF3E3E","#FFA238","#2DD540","#6B7EFF"];
const fineDustStatuses = {
  WORST: 0,
  BED: 1,
  NORMAL: 2,
  GOOD: 3
}
function paintImage(iconId) {
  const image = new Image();
  image.src = `img/weather/${iconId}.png`;
  image.classList.add("weatherImage");
  weatherImg.appendChild(image);
  //   image.addEventListener("loadend", handleimgLoad);
}

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("lat : ",lat,"lon :", lon);
  const waetherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const airPollutionurl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(waetherurl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.innerText = data.name;
      const iconId = data.weather[0].icon;
      console.log(iconId);
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
      paintImage(iconId);
    }
    // console.log(data.name,`${data.weather[0].main} / ${data.main.temp}`);
    );
    fetch(airPollutionurl)
    .then((response) => response.json())
    .then((data) => {
      const pm10 = data.list[0].components.pm10, pm2_5=data.list[0].components.pm2_5;
      finedustPM10.innerText = `${pm10}`;
      finedustPM2_5.innerText = `${pm2_5}`;
      if(150<pm10)
      {
        finedustPM10Status.innerText = "미세먼지 매우 나쁨 !!!";
        finedustPM10Status.parentElement.style.background = colors[fineDustStatuses.WORST];
      }
      else if(80<pm10)
      {
        finedustPM10Status.innerText = "미세먼지 나쁨 !!!";
        finedustPM10Status.parentElement.style.background = colors[fineDustStatuses.BED];
      }
      else if(30<pm10)
      {
        finedustPM10Status.innerText = "미세먼지 보통 !!!";
        finedustPM10Status.parentElement.style.background = colors[fineDustStatuses.NORMAL];
      }
      else
      {
        finedustPM10Status.innerText = "미세먼지 좋음 !!!";
        finedustPM10Status.parentElement.style.background = colors[fineDustStatuses.GOOD];
      }
      if(75<pm2_5)
      {
        finedustPM2_5Status.innerText = "초미세먼지 매우 나쁨 !!!";
        finedustPM2_5Status.parentElement.style.background = colors[fineDustStatuses.WORST];
      }
      else if(35<pm2_5)
      {
        finedustPM2_5Status.innerText = "초미세먼지 나쁨 !!!";
        finedustPM2_5Status.parentElement.style.background = colors[fineDustStatuses.BED];
      }
      else if(15<pm2_5)
      {
        finedustPM2_5Status.innerText = "초미세먼지 보통 !!!";
        finedustPM2_5Status.parentElement.style.background = colors[fineDustStatuses.NORMAL];
      }
      else
      {
        finedustPM2_5Status.innerText = "초미세먼지 좋음 !!!";
        finedustPM2_5Status.parentElement.style.background = colors[fineDustStatuses.GOOD];
      }      
      
    }
    )    
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
