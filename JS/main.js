let today = document.getElementById('day'),
    nextDay = document.getElementsByClassName('nextday'),
    todaydate = document.getElementById('date'),
    todaydegree = document.getElementById('numberofdegree'),
    locationt = document.getElementById('location'),
    icon = document.getElementById('icon'),
    nextdayicon = document.getElementsByClassName('nextdayicon'),
    degreeofnextday = document.getElementsByClassName('nextdaydegree'),
    minmumdegreeofnextday = document.getElementsByClassName('mindegree'),
    description = document.getElementById('condition'),
    nextdaydescription = document.getElementsByClassName('nextdaydescription'),
    searchBar = document.getElementById("search"),
    months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]
    , response ,responseData
    ;


async function getApiResponseData(currentCity = 'cairo') {
    response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8bf1964e0ba94ca8810122045230303&q=${currentCity}&days=3`);
     responseData = await response.json()
    console.log(responseData)
    displayTodayWeather();
    displayNextDayWeather();
}
 getApiResponseData() ;

function displayTodayWeather() {
    let date = new Date;
    today.innerHTML = days[date.getDay()];
    todaydate.innerHTML = ` ${date.getDate()} ${months[date.getMonth()]}`;
    todaydegree.innerHTML = responseData.current.temp_c;
    locationt.innerHTML = responseData.location.name;
    icon.setAttribute("src",`https:${responseData.current.condition.icon}`)
    description.innerHTML = responseData.current.condition.text;
  

}


function displayNextDayWeather() {
    for(let i = 0 ; i < 2  ; i++)
    {
       nextDay[i].innerHTML= days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
       console.log(nextDay[i].innerHTML= days[new Date(responseData.forecast.forecastday[i+1].date).getDay()]);
       nextdayicon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
       degreeofnextday[i].innerHTML =responseData.forecast.forecastday[i+1].day.maxtemp_c ;
       minmumdegreeofnextday[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
       nextdaydescription[i].innerHTML =responseData.forecast.forecastday[i+1].day.condition.text;
    }
   
}

searchBar.addEventListener("keyup", function(){
   currentCity= searchBar.value;
 console.log( currentCity);
 getApiResponseData(currentCity);

})


