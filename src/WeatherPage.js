import React, {useEffect} from "react";

import './WeatherPage.scss'
import {CityClock} from "./CityClock.js";

export function WeatherPage({weather}) {

  return weather && (
    <div className="weather page">
      <div className="weather__item weather__weatherClock">
        <CityClock className="" timezoneOffset={weather.city.timezone} city={weather.city.name} />
      </div>
      <div className="weather__item weather__weatherIcon">
        <WeatherIcon className="" state={weather} />
      </div>
      <div className="weather__item weather__details">
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