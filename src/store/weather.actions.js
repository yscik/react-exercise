import {apiGet} from "../api.js";

export function clearWeather() {
  return {
    type: 'WEATHER_UNSET',
    weather: null
  };

}

export function weatherLoaded(weather) {
  return {
    type: 'WEATHER_LOADED',
    weather
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
  return async (dispatch, getState) => {
    const {authtoken} = getState();

    const query = encodeURIComponent(city);
    const weatherInfo = await apiGet(`/weather/${query}`, {dispatch, authtoken});

    dispatch(weatherLoaded(weatherInfo));

  }
}


export function selectCity(city)
{
  return async (dispatch) => {
    dispatch(citySelected(city));
    dispatch(loadWeatherForCity(city));
  }

}