import React from 'react';
import './App.scss';
import WeatherPage from "./WeatherPage.js";
import {HashRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./LoginPage.js";
import {connectBasic} from "./store/store.js";

function App({user}) {
  if(!user)
    return <LoginPage />;
  else return (
    <HashRouter>
      <Switch>
        <Route path='/weather/:city' component={WeatherPage}/>
      </Switch>
    </HashRouter>
  );

}

App.storeProps = {
  state: ['user']
}

export default connectBasic(App);