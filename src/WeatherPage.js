import React, {useEffect} from "react";

import './WeatherPage.scss'
import {CityClock} from "./CityClock.js";
import {connect} from "react-redux";
import {loadWeatherForCity} from "./store/weather.actions.js";

function WeatherPage({match, weather, loadWeatherForCity}) {

  let {city} = match.params;
  useEffect(() => {
    console.log(city);
    loadWeatherForCity(city)
  }, [city]);

  return weather && (
    <div className="weather page">
      <div className="weather__weatherClock">
        <CityClock className="" timezoneOffset={weather.city.timezone} city={weather.city.name} />
      </div>
      <div className="weather__weatherIcon">
        <WeatherIcon className="" state={weather} />
      </div>
      <div className="weather__details">
        <WeatherDetail icon='thermometer' value={weather.temperature} />
        <WeatherDetail icon='sunrise' value={weather.sunrise} />
        <WeatherDetail icon='sunset' value={weather.sunset} />
      </div>

    </div>
  );
}

function WeatherDetail({icon, value}) {
  return (
    <div className="weatherDetail">
      <div className={"weatherDetail__icon wi wi-" + icon} />
      <div className="weatherDetail__value">{value}</div>
    </div>
  )
}

function WeatherIcon({state}) {
  return (
    <div className="weatherIcon">
      <div className={"weatherIcon__icon wi wi-owm-" + state.icon} />
      <div className="weatherIcon__description">{state.description}</div>
    </div>
  );
}

export default connect(
    ({weather}) => ({weather}),
    {loadWeatherForCity})
    (WeatherPage)