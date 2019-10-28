
export function user(state = null, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return action.user;

    case 'USER_NO_SESSION':
      return null;

    default:
      return state;
  }
}

export function userLoginError(state = false, action) {
  switch (action.type) {
    case 'USER_LOGIN_FAIL':
      return action.userLoginError;

    default:
      return state;
  }
}
export function authtoken(state = false, action) {
  return action.type === 'USER_SESSION'
      ? action.authtoken
      : state;
}