var APIKey = "8b9e9066828d1b5c54e6f1e2c2791210";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

var search = document.querySelector('.cityName');
var button = document.querySelector('.searchbutton');
var cityName = document.querySelector('.cityName');
var viewHistory = document.querySelector('.history');
var fiveDayEL = document.querySelector('.fiveDay');

// add event listener to search button
async function checkCity(currentCity){
    // get data from openweather api
    const response = await fetch (queryURL + currentCity + `&appid=${APIKey}`);
    var data = await response.json();
    console.log(data);
    document.querySelector('.today').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector('.wind').innerHTML = data.wind.speed + " MPH";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const secondResponse = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ lon + '&units=imperial&appid=' + APIKey);
    const weekData = await secondResponse.json();
    console.log(weekData);
    const weekArr = weekData.list.filter(day => day.dt_txt.includes('12:00:00'));

    let weekCard = '';
    for(let i = 0; i < weekArr.length; i++){
        const today = new Date(weekArr[i].dt_txt).toLocaleString().split(',')[0];
        const iconLink = weekArr[i].weather[0].icon;
        const iconImg = `<img src='http://openweathermap.org/img/w/${iconLink}.png'/> `;
        weekCard += `
        <div>
        <p>${today}</p>
        <div>${iconImg}</div>
        <div>${weekArr[i].main.temp}</div>
        <div>${weekArr[i].main.humidity}</div>
        <div>${weekArr[i].wind.speed}</div>
        </div>
        `
        fiveDayEL.innerHTML = weekCard;
    }
}

// function that stores city names in an array
function searchHistory(){
    var search = cityName.value;
    if(localStorage.getItem('storedCities') === null){
        localStorage.setItem('storedCities','[]');
    }
    var historySearch = JSON.parse(localStorage.getItem('storedCities'));
    historySearch.push(search);
    
    localStorage.setItem('storedCities', JSON.stringify(historySearch));
    displayHistory(historySearch);
}

function displayHistory(historySearch){
    historySearch.forEach(function(city){
        const hisBtn = document.createElement('button');
        hisBtn.textContent = city;
        hisBtn.className += 'his-past';
        viewHistory.appendChild(hisBtn);

        hisBtn.addEventListener('click',function(event){
            event.preventDefault();
            let passedCity = hisBtn.textContent;
            checkCity(passedCity);
        })
    });
}

button.addEventListener("click", ()=>{
    const currentCity = search.value;
    checkCity(currentCity);
    searchHistory();
})



//  array.forEach(function(element) {
//      console.log("hello world")
// });

