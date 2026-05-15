const http = require("http");

test("Clima de Fortaleza deve retornar status 200", (done) => {
  http.get("http://localhost:3000/api/v1/clima/Fortaleza", (res) => {
    expect(res.statusCode).toBe(200);

    done();
  });
});
