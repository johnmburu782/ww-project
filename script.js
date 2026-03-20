const API_KEY= "e42d9d4af8e2714826abf29ef700004f"

const BASE_URL = "https://api.openweathermap.org/data/2.5/"

const city = document.getElementById("city")

document.getElementById("search").addEventListener("click", getWeather)


async function getWeather(){
    try {
         const cityValue = city.value.trim() 

    if (cityValue === ''){
        alert("Please enter a city name")
        return
    }
       const response = await fetch(`${BASE_URL}weather?q=${cityValue}&appid=${API_KEY}`) 
       if (!response.ok){
        alert ("error fetching weather data")
         return
       }
       const data = await response.json () 
       console.log(data)
       updateUI(data)

    }catch (error){
        console.error("Error fetching weather data:", error)
       
        const errorDiv = document.createElement("div")
        errorDiv.style.color = "red"
        errorDiv.style.border = "1px solid red"
        errorDiv.style.padding = "10px"
        errorDiv.style.marginTop = "10px"
        errorDiv.textContent = "An error occurred while fetching weather data"
        const weatherCard = document.querySelector(".weather-card")
        weatherCard.appendChild(errorDiv)
    }
   
}
function updateUI(data){
    document.getElementById("cityName").textContent = data.name
    document.getElementById("temp").textContent = `${Math.round(data.main.temp - 273.15)}°C`
    document.getElementById("desc").textContent = data.weather[0].description
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`
    document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`
}

