const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    ["/auth/api", "/auth/google", "/api/stripe", "/api/surveys"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  )
}
/*const proxy = require('http-proxy-middleware') 
module.exports = function(app) {
    app.use(proxy(['/auth/api', '/auth/google'], { target: 'http://localhost:5000' }));
}*/