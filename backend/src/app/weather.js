import {formatTime, adjustDateForTimezone} from "../../../src/timeFormat.js";
import fetch from 'node-fetch';

export default {
  async getWeather({city}) {
    const apiKey = 'c4e590cec2f4b2a3cefdcb13652c98f9';
    const weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(r => r.json());

    return formatWeatherData(weatherInfo);
  }
}

function formatWeatherData(w) {

  const timezone = (w.timezone || 0) / 3600;

  return {
    city: {
      name: w.name,
      timezone: timezone
    },

    icon: w.weather[0].id,
    description: w.weather[0].description,
    temperature: `${w.main.temp.toFixed(0)} °C`,
    sunrise: getFormattedTime(w.sys.sunrise),
    sunset: getFormattedTime(w.sys.sunset),

  };

  function getFormattedTime(timestamp) {
    const date = new Date(timestamp*1000);
    adjustDateForTimezone(date, timezone);
    return formatTime(date, {separator: ':'});
  }
}
