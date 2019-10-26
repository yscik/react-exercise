import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {user, userLoginError} from "./user.reducers.js";
import {connect} from "react-redux";

const reducers = combineReducers({
  user,
  userLoginError
});

export default function configureStore(initialState) {
  return createStore(
      reducers,
      initialState,
      applyMiddleware(thunk)
  );
}
