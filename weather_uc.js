const mongoRepo = require('./mongo_repo');
const weatherRepo = require('./weather_repo');
const WeatherData = require('./WeatherData');

const convertMiliseconds = (hrs, min, sec) => {
  return (hrs * 60 * 60 + min * 60 + sec) * 1000;
};

const tenMin = convertMiliseconds(0, 10, 0);

const handle = async (city) => {
  const weatherDetails = await mongoRepo.getByCity(city);

  if (weatherDetails) {
    const timespan = Date.now() - weatherDetails.createdAt;
    console.log(timespan); //46124miliseconds
    if (timespan > tenMin) {
      const fetchWeatherDetails = await weatherRepo.fetchWeather(city);
      const { longtitude, latitude, tempInC } = fetchWeatherDetails;
      const newWeatherData = new WeatherData(
        city,
        longtitude,
        latitude,
        tempInC
      );
      return await mongoRepo.update(newWeatherData);
    }
    return weatherDetails;
  }
  const fetchWeatherDetails = await weatherRepo.fetchWeather(city);
  const { longtitude, latitude, tempInC } = fetchWeatherDetails;
  const newWeatherData = new WeatherData(city, longtitude, latitude, tempInC);
  return await mongoRepo.insert(newWeatherData);
};

module.exports = { handle };
