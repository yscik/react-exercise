import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authtoken, user, userLoginError} from "./user.reducers.js";
import {weather} from "./weather.reducers.js";
import {loading} from "./common.js";

const reducers = combineReducers({
  user,
  userLoginError,
  weather,
  authtoken,
  loading
});

export default function configureStore(initialState) {
  return createStore(
      reducers,
      initialState,
      applyMiddleware(thunk)

  );
}