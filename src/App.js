import React from 'react';
import './App.scss';
import {HashRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./LoginPage.js";
import SelectCityPage from "./SelectCity.js";
import CityWeather from "./CityWeather.js";
import AddCityPage from "./AddCity.js";
import {connect} from "react-redux";

function App({user, loading}) {

  return (
      <>
        <LoadingIndicator state={loading} />
        {!user
          ? <LoginPage/>
          : <HashRouter>
              <Switch>
                <Route path='/' exact={true} component={SelectCityPage}/>
                <Route path='/weather/:city' component={CityWeather}/>
                <Route path='/add-city' component={AddCityPage}/>
              </Switch>
            </HashRouter>
        });
      </>
  );


}

function LoadingIndicator({state}) {

  const {isLoading, error} = state;

  const classList = [
    'loadingindicator',
    isLoading && "loadingindicator--isLoading",
    error && "loadingindicator--hasError",
  ].filter(c => !!c).join(' ');
  return (
      <div className={classList}>
        {isLoading && <div className="loadingindicator__spinner" />}
        {error && <div className="loadingindicator__error">{error}</div>}

      </div>)
}

export default connect(({user, loading}) => ({user, loading}))(App);