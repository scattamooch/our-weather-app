//calls a few functions 
function init() {
    blankCities();
    getCities();
    eventListeners();
}
//global variables --> 
const Cities_URL = "http://localhost:3000/cities";
let cities = [];
const uglyImgLink = "https://cdn.dribbble.com/users/1798374/screenshots/10355316/media/75206ff46afe3dee7f2cd9a22426581f.png?compress=1&resize=400x300" //"blank page" image

//renders the "landing page" so the fields aren't blank on page load --> can move variables to global scope to cut down on reptition
//can potentially remove this entirely and give its functionality to another function?
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
//fetch saves cityData to an array (declared in global scope) to
function getCities() {
    fetch(Cities_URL)
    .then(response => response.json())
    .then(cityData => {
        cities = cityData;
        renderCities(cityData)
    });
}
//uses forEach to iterate through the cities array and calls renderCityNavBar to render the navbar at the bottom
function renderCities(cities) {
    const navBar = document.getElementById("flexbox-container");
    cities.forEach(city => renderCityNavBar(city, navBar));
}
//actually renders the navbar --> can probably remove value and ID, they were more relevant for the dropdown menu than a navbar
function renderCityNavBar(city, navBar) {
    const navItem = document.createElement("div");
    navItem.textContent = city.name;
    navItem.value = city.name;
    navItem.id = city.name;
    navItem.addEventListener("click", () => renderMainCity(city));
    navBar.appendChild(navItem);
}
//keydown and mouseover/mouseout events housed in one spot, called by the init function. "Modes" can be edited via their sections in CSS. 
function eventListeners() {
    window.addEventListener("keydown", (event) => {
        if (event.key === "l" || event.key === "L") {
            document.body.classList.toggle("dark-mode");
            document.body.classList.toggle("light-mode");
        }
    });

    const tooltipDiv = document.getElementById("tooltip-div");
    tooltipDiv.addEventListener("mouseover", showTooltip);
    tooltipDiv.addEventListener("mouseout", hideTooltip);
}
//renders the main city to be displayed when clicked
//Same situation as "blankCities": can be heavily refactored
function renderMainCity(city) {
    const conditionImg = document.getElementById("main-image-container");
    const cityName = document.getElementById("span-city-name");
    const condition = document.getElementById("span-condition");
    const temp = document.getElementById("temp_f");
    const feelsLike = document.getElementById("feelslike_f");
    const rain = document.getElementById("precip_in");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind_mph");
    
    conditionImg.src = city.img_url;
    cityName.textContent = city.name;
    condition.textContent = city.condition;
    temp.textContent = city.temperature + " °F";
    feelsLike.textContent = city.feels_like + " °F";
    rain.textContent = city.rain + " in";
    humidity.textContent = city.Humidity + " %";
    wind.textContent = city.wind_speed + " mph";
}
//functionality of the tooltip --> kind of ugly, but works. Might refactor
function showTooltip() {
    const tooltip = document.getElementById('tooltip-span');
    //adds "show" to the tooltip divs "class" which invokes a select set of CSS rules (see tooltip CSS)
    tooltip.parentNode.classList.add('show');                           
    const tooltipElement = document.getElementById('tooltip-span');
    const condition = document.getElementById("span-condition").textContent;
    if (condition === "Sunny") {
        tooltipElement.textContent = "It's bright and sunny!";
    } 
    else if (condition === "Partly Cloudy") {
        tooltipElement.textContent = "A little gray today.";
    } 
    else if (condition === "Overcast") {
        tooltipElement.textContent = "Full cloud coverage for today.";
    } 
    else if (condition === "Patchy, light rain with thunder") {
        tooltipElement.textContent = "Think about an umbrella for today!";
    }
}
  //hides the tooltip on mouseout
function hideTooltip() {
    const tooltip = document.getElementById('tooltip-span');
    //removes "show" so the tooltip "hides" 
    tooltip.parentNode.classList.remove('show');                     
}

init();

