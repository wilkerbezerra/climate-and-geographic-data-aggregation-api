const axios = require("axios");

async function buscarClima(latitude, longitude) {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  );

  const codigoClimatico = {
    0: "Céu limpo",
    1: "Principalmente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Neblina",
    48: "Neblina com gelo",
    51: "Garoa leve",
    61: "Chuva leve",
    63: "Chuva moderada",
    65: "Chuva forte",
    71: "Neve leve",
    95: "Trovoada",
  };

  return {
    temperatura: response.data.current_weather.temperature,
    vento: response.data.current_weather.windspeed,
    condicao: codigoClimatico[response.data.current_weather.weathercode],
    unidades: {
      temperatura: "°C",
      velocidade_vento: "km/h",
    },
  };
}

module.exports = { buscarClima };
