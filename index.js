//fetch the data
//get the city names into the dropdown
//selecting a city makes it appear in the li elements

function init() {
    blankCities();
    getCities();
    eventListeners();
}

const Cities_URL = "http://localhost:3000/cities";
let cities = [];
const uglyImgLink = "https://cdn.dribbble.com/users/1798374/screenshots/10355316/media/75206ff46afe3dee7f2cd9a22426581f.png?compress=1&resize=400x300"

function blankCities() {
    const conditionImg = document.getElementById("main-image-container");
    const cityName = document.getElementById("span-city-name");
    const condition = document.getElementById("span-condition");
    const temp = document.getElementById("temp_f");
    const feelsLike = document.getElementById("feelslike_f");
    const rain = document.getElementById("precip_in");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind_mph");
    const dropdownValue = document.getElementById("citySelect").value;
    const city = cities.find(city => city.name === dropdownValue); //find a city name in the cities data that matches the dropdown value

    conditionImg.src = uglyImgLink;
    cityName.textContent = "No city selected";
    condition.textContent = "No condition information available";
    temp.textContent = "No temperature data available";
    feelsLike.textContent = "No temperature data available";
    rain.textContent = "No rainfall data available";
    humidity.textContent = "No humidity data available";
    wind.textContent = "No wind data available";
}

function getCities() {
    fetch(Cities_URL)
    .then(response => response.json())
    .then(cityData => {
        cities = cityData;
        renderCities(cityData)
    });
}
function renderCities(cities) {
    const navBar = document.getElementById("flexbox-container");
    cities.forEach(city => renderCityNavBar(city, navBar));
}

function renderCityNavBar(city, navBar) {
    const navItem = document.createElement("div");
    navItem.textContent = city.name;
    navItem.value = city.name;
    navItem.id = city.name;
    navBar.appendChild(navItem);
}

function eventListeners() {
    const navBar = document.getElementById("flexbox-container");
    navBar.addEventListener("click", renderMainCity);

    const modeBtn = document.getElementById("mode-toggle");
    window.addEventListener("keydown", (event) => {
        if (event.key === "l" || event.key === "L") {
            document.body.classList.toggle("dark-mode");
            document.body.classList.toggle("light-mode");
        }
    });
}

function renderMainCity() {
    const conditionImg = document.getElementById("main-image-container");
    const cityName = document.getElementById("span-city-name");
    const condition = document.getElementById("span-condition");
    const temp = document.getElementById("temp_f");
    const feelsLike = document.getElementById("feelslike_f");
    const rain = document.getElementById("precip_in");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind_mph");
    const dropdownValue = document.getElementById("citySelect").value;
    const city = cities.find(city => city.name === dropdownValue); //find a city name in the cities data that matches the dropdown value

    conditionImg.src = city.img_url;
    cityName.textContent = city.name;
    condition.textContent = city.condition;
    temp.textContent = city.temperature + " °F";
    feelsLike.textContent = city.feels_like + " °F";
    rain.textContent = city.rain + " in";
    humidity.textContent = city.Humidity + " %";
    wind.textContent = city.wind_speed + " mph";
}
init();