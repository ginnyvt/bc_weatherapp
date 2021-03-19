const { v4: uuidv4 } = require('uuid');

class WeatherData {
  constructor(city, longtitude, latitude, temp) {
    this.id = uuidv4();
    this.city = city;
    this.longtitude = longtitude;
    this.latitude = latitude;
    this.tempInC = temp;
    this.createdAt = Date.now();
  }
}

module.exports = WeatherData;
