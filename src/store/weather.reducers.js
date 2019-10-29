
export function weather(state = null, action) {
  switch (action.type) {
    case 'WEATHER_LOADED':
    case 'WEATHER_UNSET':
      return action.weather;

    default:
      return state;
  }
}