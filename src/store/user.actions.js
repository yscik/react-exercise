import {apiGet, apiPost} from "../api.js";

export function userLoaded(user) {
  return {
    type: 'USER_LOGIN_SUCCESS',
    user
  };
}

export function userLoginFail(error) {
  return {
    type: 'USER_LOGIN_FAIL',
    userLoginError: error
  };
}

export function userNoSession() {
  return {
    type: 'USER_NO_SESSION',
  };
}

export function loadUser() {
  return async (dispatch, getState) => {
    const {authtoken} = getState();
    if(!authtoken)
      return dispatch(userNoSession());

    const user = await apiGet('user/info', {headers: {
        Authorization: `Bearer ${authtoken}`
      }});

    if(user)
      dispatch(userLoaded(user));

    else
      dispatch(userNoSession())
  }
}

export function setSession(authtoken = getStoredToken()) {
  storeToken(authtoken);
  return {
    type: 'USER_SESSION',
    authtoken
  };
}

export function loginUser(userCredentials) {
  return async (dispatch) => {

    const {error,token} = await apiPost('user/login', userCredentials);

    if(error)
      dispatch(userLoginFail(error));
    else {
      dispatch(setSession(token));
      dispatch(loadUser());
    }
  }
}

function getStoredToken() {
  return sessionStorage.getItem('authtoken')
}
function storeToken(token) {
  sessionStorage.setItem('authtoken', token)
}