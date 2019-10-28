import user from "./app/user.js";
import weather from "./app/weather.js";

import {withBody,withAuth,withParams,withQuery} from './api.helpers.js';

export default {
  '/user/login': withBody(user.loginUser),
  '/user/info': withAuth(user.getUserDetails),
  '/user/addCity': withParams(user.addUserCity),
  '/weather/:city': withParams(weather.getWeather),

};