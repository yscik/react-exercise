import {apiGet} from "../api.js";

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
      const weatherInfo = await apiGet(`/weather/${query}`);

      dispatch(weatherLoaded(weatherInfo));
    }
    catch(err) {
      dispatch(weatherLoadError(err))
    }
  }
}


export function selectCity(city)
{
  return async (dispatch) => {
    dispatch(citySelected(city));
    dispatch(loadWeatherForCity(city));
  }

}