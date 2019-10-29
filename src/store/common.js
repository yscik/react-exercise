
export function loadingError(error)
{
  return {
    type: 'LOADING_ERROR',
    loading: {error}
  };
}

export function loadingState(isLoading = true) {
  return {
    type: 'LOADING_STATE',
    loading: {isLoading: isLoading}
  };
}

export function loading(state = {isLoading: false}, action) {
  switch(action.type) {
    case 'LOADING_STATE':
    case 'LOADING_ERROR':
      return action.loading;
      break;
    default:
      return state;
  }
}