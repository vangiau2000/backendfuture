const routeDasboard = require("./dasbourd.route")
const routeProduct = require("./product.route")
const systemConfig = require("../../config/system")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAmin;
  app.use(PATH_ADMIN+"/dasboard", routeDasboard);
  app.use(PATH_ADMIN+"/products", routeProduct );
}