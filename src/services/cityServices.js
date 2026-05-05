const axios = require("axios");

async function procurarCidade(nome) {
  const res = await axios.get(
    `https://brasilapi.com.br/api/cptec/v1/cidade/${nome}`,
  );

  if (!res.data.length) return null;

  const cidadeEscolhida = res.data[0];

  return {
    nome: cidadeEscolhida.nome,
    estado: cidadeEscolhida.estado,
    latitude: cidadeEscolhida.latitude,
    longitude: cidadeEscolhida.longitude,
  };
}

module.exports = { procurarCidade };
