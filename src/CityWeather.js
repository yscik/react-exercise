import React, {useEffect} from "react";
import {connect} from "react-redux";
import {loadWeatherForCity} from "./store/weather.actions.js";
import {WeatherPage} from "./WeatherPage.js";
import {Link} from "react-router-dom";

function CityWeather({match, weather, loadWeatherForCity}) {



  let {city} = match.params;
  useEffect(() => {
    console.log(city);
    loadWeatherForCity(city)
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
  {loadWeatherForCity})(CityWeather)