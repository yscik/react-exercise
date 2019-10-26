import React from "react";

import './WeatherPage.scss'
import {CityClock} from "./CityClock.js";

export function WeatherPage() {
  return (
    <div className="weather page">
      <div className="weather__weatherClock">
        <CityClock className="" timezoneOffset={0} city="Budapest" />
      </div>
      <div className="weather__weatherIcon">
        <WeatherIcon className="" state={{icon: '800', description: 'sunshine'}} />
      </div>
      <div className="weather__details">
        <WeatherDetail icon='thermometer' value='-10 °C' />
        <WeatherDetail icon='sunrise' value='09:37' />
        <WeatherDetail icon='sunset' value='15:42' />
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

