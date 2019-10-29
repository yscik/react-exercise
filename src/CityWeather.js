import React, {useEffect} from "react";
import {connect} from "react-redux";
import {clearWeather, loadWeatherForCity} from "./store/weather.actions.js";
import {WeatherPage} from "./WeatherPage.js";
import {Link} from "react-router-dom";

function CityWeather({match, weather, loadWeatherForCity, clearWeather}) {

  let {city} = match.params;
  useEffect(() => {
    loadWeatherForCity(city)
    return clearWeather;
  }, [city, loadWeatherForCity]);

  return (
      <div className="page">
        <Link to='/' className='page__backlink' />
        <WeatherPage weather={weather} />
      </div>
  )
}

export default connect(
  ({weather}) => ({weather}),
  {loadWeatherForCity, clearWeather})(CityWeather)