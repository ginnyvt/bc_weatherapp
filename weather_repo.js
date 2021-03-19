const API_KEY = process.env.OPEN_WEATHER_API;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const axios = require('axios');

const fetchWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}q=${city}&units=metric&appid=${API_KEY}`
    );
    const { coord, main: temperature } = response.data;

    return {
      city,
      longtitude: coord.lon,
      latitude: coord.lat,
      tempInC: temperature.temp.toString(),
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { fetchWeather };
