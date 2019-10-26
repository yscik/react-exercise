import {apiGet, apiGetMock} from "../api.js";

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
  return async (dispatch) => {
    const user = await apiGetMock('/api/user');

    if(user)
      dispatch(userLoaded(user));

    else
      dispatch(userNoSession(user))
  }
}

export function loginUser(userCredentials) {
  return async (dispatch) => {

    const {error} = await apiGetMock('/api/login', {method: 'POST', body: userCredentials});

    if(error)
      dispatch(userLoginFail(error));
    else
      dispatch(loadUser());

  }
}