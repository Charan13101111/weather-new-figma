const apikey = "3fe1d597cb80c0f2a65d0d9a3a005473";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city = "London") {
    if (!city) {
        console.error("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();

        // Add error handling for data extraction
        if (data.name && data.main && data.main.temp) {
            document.querySelector("#location").textContent = data.name;
            document.querySelector("#temperature").textContent = `${Math.round(data.main.temp)}°Celsius`;

            // Optional: Uncomment and adjust as needed
            // document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
            // document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

            // Weather icon logic
            const weatherMain = data.weather[0].main;
            const iconMap = {
                "Clouds": "clouds.png",
                "Clear": "clear.png",
                "Rain": "rain.png",
                "Drizzle": "drizzle.png",
                "Mist": "mist.png"
            };

            if (weatherIcon && iconMap[weatherMain]) {
                weatherIcon.src = `images/${iconMap[weatherMain]}`;
            }
        } else {
            throw new Error("Incomplete weather data");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert(error.message);
    }
}

// Event listener for search button
document.querySelector("button").addEventListener("click", () => {
    const location = document.querySelector("input").value;
    checkWeather(location);
});

// Event listener for Enter key
document.querySelector("input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = e.target.value;
        checkWeather(city);
    }
});       

// Load default weather on page load
checkWeather();