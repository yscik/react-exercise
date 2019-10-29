
import cityData from '../data/cities.js'
import userApi from './user.js'

const cities = cityData.map(c => c.capital).sort();

export default
{
  async searchCities({term, user})
  {
    term = term.toLowerCase();

    let result = cities.filter(name => name.toLowerCase().includes(term));

    result = await excludeUserCities(result, user);

    result.sort((a,b) => a.toLowerCase().indexOf(term) - b.toLowerCase().indexOf(term));

    result.length = Math.min(result.length, 8);

    return result;
  }
}

async function excludeUserCities(result, user)
{
  const {cities: userCities} = await userApi.getUserDetails(user);
  return result.filter(name => userCities.indexOf(name) === -1);
}
