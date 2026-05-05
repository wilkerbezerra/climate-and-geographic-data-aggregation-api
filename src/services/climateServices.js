const axios = require("axios");

async function procurarClima(lat, lon) {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
  );
  return {
    temperatura: res.data.current_weather.temperature,
    vento: res.data.current_weather.windspeed,
    unidade: "°C",
  };
}

module.exports = { procurarClima };
