const http = require("http");

test("Health check deve retornar status 200", (done) => {
  http.get("http://localhost:3000/api/v1/health", (res) => {
    expect(res.statusCode).toBe(200);

    done();
  });
});
