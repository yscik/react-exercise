import React from 'react';
import './App.scss';
import WeatherPage from "./WeatherPage.js";
import {HashRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./LoginPage.js";
import SelectCityPage from "./SelectCity.js";
import {connectBasic} from "./store/store.js";
import {AddCityPage} from "./AddCity.js";

function App({user}) {
  if(!user)
    return <LoginPage />;
  else return (
    <HashRouter>
      <Switch>
        <Route path='/' exact={true} component={SelectCityPage}/>
        <Route path='/weather/:city' component={WeatherPage}/>
        <Route path='/add-city' component={AddCityPage}/>
      </Switch>
    </HashRouter>
  );

}

App.storeProps = {
  state: ['user']
}

export default connectBasic(App);