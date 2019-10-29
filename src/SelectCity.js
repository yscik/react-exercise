import React from "react";
import {selectCity} from "./store/weather.actions.js";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import './SelectCity.scss';

function SelectCityPage({cities = []}) {

  return (
    <div className="selectCity page">
      <ul className='list'>
        {cities.map( city => <CityItem city={city} key={city} />)}
      </ul>
      <Link to='/add-city' className='button selectCity__addCity'>+</Link>
    </div>
  );
}

function CityItem({city}) {

  return (
    <li className='list__item'>
      <Link className='selectCity__listItem' to={`/weather/${city}`}>{city}</Link>
    </li>
  )
}

export default connect(
    state => ({cities: state.user.cities }),
    {selectCity})(SelectCityPage)