

const iconinfo = document.querySelector(".weather-icon");
const tempinfo = document.querySelector(".temperature-value p");
const descinfo = document.querySelector(".temperature-description p");
const locationinfo = document.querySelector(".location p");
const notificationinfo = document.querySelector(".notification");


const weather = {};

weather.temperature = {
    unit : "celsius"
}






if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition);
}else{
    notificationinfo.style.display = "block";
    notificationinfo.innerHTML = "<p>your location isn't recognized by browser</p>";
}


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    post(latitude, longitude);
}


const key = "9cde11b82b4efe17f8560ddb3a935587";
const subtract = 273;

function post(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(get){
            let data = get.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - subtract);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            display();
        });
}



function display(){
    iconinfo.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempinfo.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descinfo.innerHTML = weather.description;
    locationinfo.innerHTML = `${weather.city}, ${weather.country}`;
}
