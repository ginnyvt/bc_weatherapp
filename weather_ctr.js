const weatherUc = require('./weather_uc');

const invoke = async (req) => {
  const city = req.body.city;
  // console.log(city);
  return await weatherUc.handle(city);
};

module.exports = { invoke };
