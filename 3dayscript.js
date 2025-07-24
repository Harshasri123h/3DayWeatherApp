function getEmoji(condition) {
  const text = condition.toLowerCase();
  if (text.includes("sunny") || text.includes("clear")) return "☀️";
  if (text.includes("cloud")) return "☁️";
  if (text.includes("rain") || text.includes("drizzle")) return "🌧️☔";
  if (text.includes("thunder")) return "⛈️";
  if (text.includes("fog") || text.includes("mist") || text.includes("haze")) return "🌫️";
  if (text.includes("snow")) return "❄️";
  return "🌈";
}

async function getForecast() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiKey = 'f475d367bffb4362b7b82237252307';
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes&alerts=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const forecast = data.forecast.forecastday;
    const location = `${data.location.name}, ${data.location.country}`;
    let html = `<h2>📍 ${location}</h2>`;

    forecast.forEach(day => {
      const date = day.date;
      const condition = day.day.condition.text;
      const icon = getEmoji(condition);
      const maxTemp = day.day.maxtemp_c;
      const minTemp = day.day.mintemp_c;
      const humidity = day.day.avghumidity;
      const wind = day.day.maxwind_kph;
      const rainChance = day.day.daily_chance_of_rain;

      html += `
        <div class="forecast-day">
          <h3>${icon} ${date}</h3>
          <p><strong>📝 Condition:</strong> ${condition}</p>
          <p><strong>🌡️ Temp:</strong> Max ${maxTemp}°C / Min ${minTemp}°C</p>
          <p><strong>💧 Humidity:</strong> ${humidity}%</p>
          <p><strong>💨 Wind:</strong> ${wind} km/h</p>
          <p><strong>☔ Rain Chance:</strong> ${rainChance}%</p>
        </div>
      `;
    });

    document.getElementById("weatherResult").innerHTML = html;
  } catch (err) {
    document.getElementById("weatherResult").innerHTML = `<p>❌ Error: ${err.message}</p>`;
  }
}
