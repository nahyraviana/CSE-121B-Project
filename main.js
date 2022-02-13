/* jshint esversion: 6 */
/* STEP 1: Create a new variable to store the API information (Key and URL)*/

const api = {
    key: "2a32c2f4d97c29bdba163349a70e63f4",
    base: "https://api.openweathermap.org/data/2.5/"
};
/* STEP 2  Assign the Search box property to a variable and add an event listener*/
const searchBox = document.querySelector(".searchbox");
searchBox.addEventListener("keypress", setQuery);

/* STEP 3 Create a function to initialize the search box when the enter/return key is pressed*/

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}
/* STEP 4: Create a function to get the result using the fetch method and return the weather*/

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(weather => { return weather.json(); })
        .then(displayResults);
}
/*STEP 5: Create a function to build the date and return the display of Day, date, month, year*/
function dateBuilder(d) {
    /* STEP 6: Declare an array to store the months of the year and another to the days of the week*/
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    /*STEP 7: Use built in methods to call the day,date,month and full year*/
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;


}
/*STEP 8: Create a function to display the results*/

function displayResults(weather) {
    console.log(weather);
    /*STEP 9: assign the properties to a variable and display it*/
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name} , ${weather.sys.country}`;
    /*STEP 10: Declare and initialize a new variable to hold the current date*/
    let now = new Date();
    /* STEP 11: Assign the date property to a variable and call the current date*/
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);
    /*STEP 12: Assign the temp property to a variable and display the current temperature */
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    /*STEP 12: Assign the weather property to a variable and display the current weather */
    let weatherElement = document.querySelector(".current .weather");
    weatherElement.innerText = weather.weather[0].main;

    /*STEP 13: Assign the hi-lo property to a variable and display the Max and min temperatures */
    let hilo = document.querySelector(".hi-lo");
    hilo.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}