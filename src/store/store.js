import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {user, userLoginError} from "./user.reducers.js";
import {connect} from "react-redux";
import {weather} from "./weather.reducers.js";

const reducers = combineReducers({
  user,
  userLoginError,
  weather,
});

export default function configureStore(initialState) {
  return createStore(
      reducers,
      initialState,
      applyMiddleware(thunk)
  );
}

export function connectBasic(Component) {

  const stateFn = (state) => {
    if(!Component.storeProps.state)
      return {};
    return mapObject(Component.storeProps.state,
        ([,value]) => state[value])
  };

  const actionFn = (dispatch) => {
    if(!Component.storeProps.actions)
      return {};
    return mapObject(Component.storeProps.actions,
        ([,value]) => (...args) => dispatch(value(...args))
    );
  };

  return connect(stateFn, actionFn)(Component)
}

function mapObject(obj, valueFn) {
  const entries = Array.isArray(obj)
    ? obj.map(key => [key,key])
    : Object.entries(obj);
  return entries
      .reduce((m, [key,value]) => {
        m[key] = valueFn([key, value]);
        return m;
      }, {})
}