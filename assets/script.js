var APIKey = "8b9e9066828d1b5c54e6f1e2c2791210";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

var search = document.querySelector('.search input');
var button = document.querySelector('.search button');

// add event listener to search button
async function checkCity(city){
    // get data from openweather api
    const response = await fetch (queryURL + city + `&appid=${APIKey}`);
    var data = await response.json();
    console.log(data);
    document.querySelector('.today').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector('.wind').innerHTML = data.wind.speed + " MPH";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";

    
    
    // call function that stores city names
    
    
}

// function that stores city names in an array
// function saveCityNames(){
//     var cityName = city.value;
//     var storedCities = JSON.parse(localStorage.getItem("storedCities")) || [];
//     var cities = cityName;
//     storedCities.push(cities);
//     localStorage.setItem("storedCities", JSON.stringify(storedCities));
// }

button.addEventListener("click", ()=>{
    checkCity(search.value);
    // saveCityNames();
})



//  array.forEach(function(element) {
//      console.log("hello world")
// });

