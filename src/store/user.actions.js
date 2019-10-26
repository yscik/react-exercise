
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
    const user = await fetch('/api/user');

    if(user)
      dispatch(userLoaded(user));

    else
      dispatch(userNoSession(user))
  }
}

export function loginUser(userCredentials) {
  return async (dispatch) => {

    const {error} = await fetch('/api/login', {method: 'POST', body: userCredentials});

    if(error)
      dispatch(userLoginFail(error));
    else
      dispatch(loadUser());

  }
}

async function fetch(url, opts) {
  return {
    '/api/login': { },
    '/api/user': { name: 'Macauley Valenzuela', cities: ['Budapest', 'Madrid']},

  }[url];
}

