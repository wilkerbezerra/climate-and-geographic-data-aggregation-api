# API de Agregação de Dados Climáticos e Geográficos

## Descrição

API REST desenvolvida para integração de dados climáticos e geográficos utilizando APIs públicas externas.

---

## Tecnologias Utilizadas

- Node.js
- Express
- Axios
- CORS
- Jest

---

## Como executar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar API

```bash
npm start
```

Servidor:

```bash
http://localhost:3000
```

---

## Executar testes

```bash
npm test
```

---

## Endpoints

### Health Check

```http
GET /api/v1/health
```

### Buscar clima por cidade

```http
GET /api/v1/clima/Fortaleza
```

### Buscar cidades por estado

```http
GET /api/v1/cidades/CE?limite=5
```

---

## APIs utilizadas

- Brasil API
- OpenStreetMap Nominatim
- Open-Meteo
