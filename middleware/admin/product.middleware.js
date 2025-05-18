module.exports.title = (req, res, next) => {
  if (!req.body.title) {
    req.flash('error', 'Lỗi');
    console.log("đã vào phủ")
    return res.redirect("/admin/products/create")
  }
  next()
}