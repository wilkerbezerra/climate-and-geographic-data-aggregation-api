const axios = require("axios");

async function buscarMunicipiosPorUF(uf) {
  try {
    const response = await axios.get(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { buscarMunicipiosPorUF };
