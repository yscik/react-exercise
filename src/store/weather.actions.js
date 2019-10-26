import {apiGet} from "../api.js";
import {adjustDateForTimezone, formatTime} from "../timeFormat.js";

export function weatherLoaded(weather) {
  return {
    type: 'WEATHER_LOADED',
    weather
  };
}

export function weatherLoadError(error) {
  console.error(error);
  return {
    type: 'WEATHER_LOAD_ERROR',
    error
  };
}

export function citySelected(city) {
  return {
    type: 'CITY_SELECTED',
    city
  };
}

export function loadWeatherForCity(city)
{
  return async (dispatch) => {

    try {
      const query = encodeURIComponent(city);
      const apiKey = 'c4e590cec2f4b2a3cefdcb13652c98f9';

      const weatherInfo = await
          apiGet(`//api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`)

      dispatch(weatherLoaded(formatWeatherData(weatherInfo)));
    }
    catch(err) {
      dispatch(weatherLoadError(err))
    }
  }
}

function formatWeatherData(w) {

  console.log(w)
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

export function selectCity(city)
{
  return async (dispatch) => {
    dispatch(citySelected(city));
    dispatch(loadWeatherForCity(city));
  }

}