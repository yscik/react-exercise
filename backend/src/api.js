import user from "./app/user.js";
import weather from "./app/weather.js";
import city from "./app/city.js";

import {withAuth, withBody, appCall} from './api.helpers.js';
import bodyParser from "body-parser";


export default
{
  '/user/login': [
      withBody, appCall(
      req => req.body,
      user.loginUser
  )],

  '/user/info': [
      ...withAuth, appCall(
      req => req.user,
      user.getUserDetails)],

  '/user/addCity': [
      ...withAuth, withBody, appCall(
      req => (
          { user: req.user, city: req.body.city}),
      user.addUserCity)],

  '/weather/:city': [
      ...withAuth, appCall(
      req => req.params,
      weather.getWeather)],

  '/city/search': [
      ...withAuth, appCall(
      req => ({term: req.query.term, user: req.user}),
      city.searchCities)],

};