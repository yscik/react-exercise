
export function weather(state = null, action) {
  switch (action.type) {
    case 'WEATHER_LOADED':
      return action.weather;

    default:
      return state;
  }
}