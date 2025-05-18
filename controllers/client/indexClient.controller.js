const Product = require("../../models/product.model")
// [GET] /
module.exports.index = async (req, res) => {
  const query = {
    deleted: false,
    status: "active"
  }
  const dataProduct = await Product.find(query).sort({position: "asc"})
  dataProduct.forEach(item => {
    item.priceNew =(item.price * (100 - item.discountPercentage)/100).toFixed(0)
  })
  res.render("client/pages/product/product", {titlePage:"product", dataProduct})
}
// [GET] /products/detail/:id
module.exports.detail = async (req, res) => {
  const dataProduct = await Product.findOne({_id: req.params.id})
  console.log(dataProduct)
  res.render("client/pages/detail/index", {
    titlePage: dataProduct.slug || dataProduct.title, 
    dataProduct
  })
}