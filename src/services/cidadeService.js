const axios = require("axios");

async function buscarCidade(nome) {
  try {
    const response = await axios.get(
      `https://brasilapi.com.br/api/cptec/v1/cidade/${nome}`,
    );

    if (!response.data.length) {
      return null;
    }

    const cidade = response.data[0];

    const georreferenciamento = await axios.get(
      `https://nominatim.openstreetmap.org/search?city=${cidade.nome}&state=${cidade.estado}&country=Brazil&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "climate-and-geographic-data-aggregation-api",
        },
      },
    );

    if (!georreferenciamento.data.length) {
      return null;
    }

    return {
      nome: cidade.nome,
      estado: cidade.estado,
      latitude: georreferenciamento.data[0].lat,
      longitude: georreferenciamento.data[0].lon,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

module.exports = { buscarCidade };
