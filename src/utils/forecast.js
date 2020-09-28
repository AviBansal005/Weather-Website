const request = require("request");
require('dotenv').config();

const apikey = process.env.API_KEY;
const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${apikey}&query=${address}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to API", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { current,location } = body;
      const { temperature, precip,weather_descriptions} = current;
      const {name,region,country} = location;
      
      callback(
        undefined,
        `${name},${region},${country}`,
        `${weather_descriptions}
        It is currently ${temperature} degrees out.
        There is a ${precip}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;