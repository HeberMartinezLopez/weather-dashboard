var APIKey = "1cf47569e1d5050c6ff614e82b835c07";
var button = document.querySelector('.search');
var city = document.querySelector('.cityName');
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city.value+"&appid= " + APIKey;

// add event listener to search button
button.addEventListener('click', function(){
    // get data from openweather api
    fetch(queryURL)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    
    // call function that stores city names
    saveCityNames();

})

// function that stores city names in an array
function saveCityNames(){
    var cityName = city.value;
    var storedCities = JSON.parse(localStorage.getItem("storedCities")) || [];
    var cities = cityName;
    storedCities.push(cities);
    localStorage.setItem("storedCities", JSON.stringify(storedCities));
}

//  array.forEach(function(element) {
//      console.log("hello world")
// });