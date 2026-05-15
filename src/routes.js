const express = require("express");
const router = express.Router();

const { buscarCidade } = require("./services/cidadeService");
const { buscarClima } = require("./services/climaService");
const { buscarMunicipiosPorUF } = require("./services/estadoService");

router.get("/health", (req, res) => {
  return res.status(200).json({
    status: "healthy",
    versao: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

router.get("/clima/:cidade", async (req, res) => {
  const { cidade } = req.params;

  if (!cidade || cidade.trim().length < 2) {
    return res.status(400).json({
      erro: true,
      codigo: "NOME_INVALIDO",
      mensagem: "O nome da cidade deve conter pelo menos 2 caracteres",
      nome_informado: cidade,
    });
  }

  try {
    const dadosCidade = await buscarCidade(cidade);

    if (!dadosCidade) {
      return res.status(404).json({
        erro: true,
        codigo: "CIDADE_NAO_ENCONTRADA",
        mensagem: "Nenhuma cidade encontrada com o nome informado",
        nome_informado: cidade,
      });
    }

    const dadosClima = await buscarClima(
      dadosCidade.latitude,
      dadosCidade.longitude,
    );

    return res.status(200).json({
      nome: dadosCidade.nome,
      estado: dadosCidade.estado,
      clima: dadosClima,
      consultado_em: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(503).json({
      erro: true,
      codigo: "SERVICO_EXTERNO_INDISPONIVEL",
      mensagem:
        "Não foi possível obter dados do serviço externo. Tente novamente em alguns instantes",
      servico: "Open-Meteo",
    });
  }
});

router.get("/cidades/:uf", async (req, res) => {
  const { uf } = req.params;

  const limite = parseInt(req.query.limite, 10) || 10;

  if (uf.length !== 2) {
    return res.status(400).json({
      erro: true,
      codigo: "SIGLA_UF_INVALIDA",
      mensagem: "A sigla do estado deve conter exatamente 2 letras",
      sigla_uf_informada: uf,
    });
  }

  try {
    const cidades = await buscarMunicipiosPorUF(uf);

    return res.status(200).json({
      uf: uf.toUpperCase(),
      quantidade_retornada: limite,
      cidades: cidades.slice(0, limite).map((cidade) => ({
        nome: cidade.nome,
      })),
      consultado_em: new Date().toISOString(),
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        erro: true,
        codigo: "UF_NAO_ENCONTRADA",
        mensagem: "Estado com a sigla informada não foi encontrado",
        sigla_uf_informada: uf,
      });
    }

    return res.status(503).json({
      erro: true,
      codigo: "SERVICO_EXTERNO_INDISPONIVEL",
      mensagem: "Erro no serviço externo",
    });
  }
});

module.exports = router;
