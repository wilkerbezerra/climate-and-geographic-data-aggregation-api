const http = require("http");

test("Cidade inválida deve retornar 404", (done) => {
  http.get("http://localhost:3000/api/v1/clima/CidadeFalsa666", (res) => {
    expect(res.statusCode).toBe(404);

    done();
  });
});
