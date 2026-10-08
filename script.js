const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async function () {


   const city = cityInput.value.trim();

    if (city === "") {
    alert("Please enter a city name");
    return;
    }
    console.log("City:", city);
    document.getElementById("condition").textContent = "Loading...";

    // Step 1: City name se latitude aur longitude lena
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    if (!data.results) {
    document.getElementById("condition").textContent = "Weather not available";
    alert("City not found");
    return;
    }
    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);


    // Step 2: Latitude aur longitude se weather data lena
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,visibility,weather_code`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    console.log(weatherData);


    // Step 3: Temperature
    const temperature = weatherData.current.temperature_2m;

    console.log("Temperature:", temperature);

    document.getElementById("temperature").textContent =
        temperature + "°C";


    // Step 4: Humidity
    const humidity = weatherData.current.relative_humidity_2m;

    console.log("Humidity:", humidity);

    document.getElementById("humidity").textContent =
        humidity + "%";


    // Step 5: Wind
    const wind = weatherData.current.wind_speed_10m;

    console.log("Wind:", wind);

    document.getElementById("wind").textContent =
        wind + " km/h";


    // Step 6: Feels Like
    const feelsLike = weatherData.current.apparent_temperature;

    console.log("Feels Like:", feelsLike);

    document.getElementById("feelsLike").textContent =
        feelsLike + "°C";


    // Step 7: Visibility
    const visibility = weatherData.current.visibility;
    const weatherCode = weatherData.current.weather_code;
    console.log("Weather Code:", weatherCode);
    let condition = "";

if (weatherCode === 0) {
    condition = "Clear Sky";
}
else if (weatherCode === 1 || weatherCode === 2) {
    condition = "Partly Cloudy";
}
else if (weatherCode === 3) {
    condition = "Cloudy";
}
else if (weatherCode >= 51 && weatherCode <= 67) {
    condition = "Rain";
}
else if (weatherCode >= 71 && weatherCode <= 77) {
    condition = "Snow";
}
else if (weatherCode >= 80 && weatherCode <= 82) {
    condition = "Rain Showers";
}
else if (weatherCode >= 95) {
    condition = "Thunderstorm";
}
else {
    condition = "Unknown";
}
let icon = "";

if (weatherCode === 0) {
    icon = "☀️";
}
else if (weatherCode === 1 || weatherCode === 2) {
    icon = "🌤️";
}
else if (weatherCode === 3) {
    icon = "☁️";
}
else if (weatherCode >= 51 && weatherCode <= 67) {
    icon = "🌧️";
}
else if (weatherCode >= 71 && weatherCode <= 77) {
    icon = "❄️";
}
else if (weatherCode >= 80 && weatherCode <= 82) {
    icon = "🌦️";
}
else if (weatherCode >= 95) {
    icon = "⛈️";
}
else {
    icon = "🌡️";
}

document.getElementById("weatherIcon").textContent = icon;
console.log("Condition:", condition);

document.getElementById("condition").textContent = condition;

    console.log("Visibility:", visibility);

    document.getElementById("visibility").textContent =
        (visibility / 1000).toFixed(1) + " km";


    document.getElementById("cityName").textContent = city;
    const today = new Date();
    console.log("Today's Date:", today);

    const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
    };

   const currentDate = today.toLocaleDateString("en-IN", options);

   document.getElementById("date").textContent = currentDate;
    
});
