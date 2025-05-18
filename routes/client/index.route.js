const route = require("./productClient.route")
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("client/pages/home/home", {titlePage:"Home"})
  })
  app.use('/products', route)
}