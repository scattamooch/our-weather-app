let currentWeatherNYC = "https://api.meteomatics.com/2023-06-06T10:05:00.000-04:00/t_2m:F/40.7127281,-74.0060152/json?model=mix"
username='_stevens';
password='NMU50sm4cs';
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// function fetchData() {
//     const username = _stevens;
//     const password = NMU50sm4cs;
//     let currentWeatherNYC = "https://api.meteomatics.com/2023-06-06T10:05:00.000-04:00/t_2m:F/40.7127281,-74.0060152/json?model=mix";

//     fetch(currentWeatherNYC)
//           .then(response => response.json())
//           .then(data => {}
// }

fetch(currentWeatherNYC)
    .then(response => response.text())
    .then(data => {
    console.log(data);
    });