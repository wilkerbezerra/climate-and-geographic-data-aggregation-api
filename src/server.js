const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

// app.get("/", (req, res) => {
//   res.send("Servidor rodando!!!!");
// });

app.listen(3000, () => {
  console.log("Servidor rodando em localhost:3000");
});
