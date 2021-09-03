const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=aa70143f4dced4b6a05674b2d9923b31&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      const currentWeather = response.body.current;
      const temperature = currentWeather.temperature;
      const feelslike = currentWeather.feelslike;
      const weatherDescription = currentWeather.weather_descriptions[0];
      const dataString = `${weatherDescription}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`;
      callback(undefined, dataString);
    }
  });
};

module.exports = forecast;