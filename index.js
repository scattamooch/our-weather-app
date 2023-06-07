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
    navItem.addEventListener("click", renderMainCity);
    navBar.appendChild(navItem);
}

function eventListeners() {
    window.addEventListener("keydown", (event) => {
        if (event.key === "l" || event.key === "L") {
            document.body.classList.toggle("dark-mode");
            document.body.classList.toggle("light-mode");
        }
    });

    const imgElement = document.getElementById("main-image-container");
    imgElement.addEventListener("mouseover", genericWeatherAdvisement);
    imgElement.addEventListener("mouseout", hideWeatherAdvisement);
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
    const navBarValue = this.textContent;         //this.textContent assigns the value of the "click" to navBarValue so .find still works. Workaround for transitioning from dropdown to navbar
    const city = cities.find(city => city.name === navBarValue); //find a city name in the cities data that matches the dropdown value

    conditionImg.src = city.img_url;
    cityName.textContent = city.name;
    condition.textContent = city.condition;
    temp.textContent = city.temperature + " °F";
    feelsLike.textContent = city.feels_like + " °F";
    rain.textContent = city.rain + " in";
    humidity.textContent = city.Humidity + " %";
    wind.textContent = city.wind_speed + " mph";
}

function genericWeatherAdvisement(e) {
    const mouseoverCaption = document.getElementById("random-div");
    const x = e.clientX;
    const y = e.clientY;

    mouseoverCaption.style.left = x + "px";
    mouseoverCaption.style.top = y + "px";

    console.log("aslkdfjasflk")
    const imgElement = document.getElementById("main-image-container");
    const sunnyImg = "https://t3.ftcdn.net/jpg/02/50/08/68/360_F_250086872_srlXRqANYR2IbNfIylRDc3eMO9MinjnV.jpg"
    const cloudyImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2EMAtfJuOYFCc_-iB4I2ITrd08fw6TzZjw&usqp=CAU"
    const overcastImg = "https://freesvg.org/img/sivvus_weather_symbols_3.png"
    const rainyImg = "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/cloud-with-lightning-and-rain.png"
    if (imgElement.src === sunnyImg) {
        const sunnyCaption = document.createElement("div");
        sunnyCaption.setAttribute("class", "sunny-caption");
        sunnyCaption.textContent = "It's beautiful";
        mouseoverCaption.appendChild(sunnyCaption);
    }
}
function hideWeatherAdvisement() {
    const mouseoverCaptionParent = document.getElementById("random-div");
    const mouseoverCaption = document.querySelectorAll(".sunny-caption");
    mouseoverCaptionParent.removeChild(mouseoverCaption);
}

init();