// [GET] admin/products
const Product = require("../../models/product.model");
const pagination = require("../../helpers/pagination");
module.exports.index = async (req, res) => {
  const { status, search } = req.query;
  const query = {
    deleted: false,
  };
  if (status) query.status = status;
  if (search) query.title = { $regex: search, $options: "i" };

  const objectPagination = await pagination(req.query, 4, Product);
  const dataProduct = await Product.find(query)
    .limit(objectPagination.quantilyItem).sort({position: "asc"})
    .skip((objectPagination.currentPage - 1) * objectPagination.quantilyItem);
  res.render("admin/pages/product/index.pug", {
    titlePage: "products",
    dataProduct,
    buttonActiveFilter: query.status || "",
    objectPagination,
  });
};

// [PATCH] admin/products/updateStatus
module.exports.changeStatus = async (req, res) => {
  const { status, id } = req.params;
  const statusCurrent = status == "active" ? "inactive" : "active";
  await Product.updateOne({ _id: id }, { status: statusCurrent });
  req.flash('info', 'change status success');
  res.redirect("/admin/products");
};

// [PATCH ] admin/products/changeStatusMutil
module.exports.changeStatusMutil = async (req, res) => {
  const { type, ids } = req.body;
  const arrayIds = ids.split(",");
  switch (type) {
    case "active":
      await Product.updateMany(
        { _id: { $in: arrayIds } },
        { $set: { status: type } }
      );
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: arrayIds } },
        { $set: { status: type } }
      );
      break;
    case "deleted-all":
      await Product.updateMany(
        { _id: { $in: arrayIds } },
        { $set: { deleted: true, deleteAt: new Date() } }
      );
    case "undo":
      console.log("đã chạy vào đay")
      await Product.updateMany(
        { _id: { $in: arrayIds } },
        { $set: { deleted: false, deleteAt: new Date() } }
      );

    default:
  }
  res.redirect("/admin/products");
};

// [PATCH] admin/products/deleted
module.exports.deleted = async (req, res) => {
  const query = {
    deleted: true,
  };
  const dataProduct = await Product.find(query);
  res.render("admin/pages/deleted/index.pug", {
    titlePage: "thùng rác",
    dataProduct,
  });
};


// [PATCH] admin/products/deleted
module.exports.position = async (req, res) => {
  const {id, position} = req.params
  await Product.updateOne({_id:id}, {
    position: parseInt(position)
  })
  res.redirect("/admin/products")
};
// [GET] admin/products/create
module.exports.createView = (req, res) => {
  res.render("admin/pages/create/index.pug", {
    titlePage: "Trang tạo sản phẩm"
  }
  )
}

// [POST] admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage =  parseInt(req.body.discountPercentage)
  req.body.stock =  parseInt(req.body.stock)
  if (req.body.position == "") {
    const countProduct  = await Product.countDocuments()
    req.body.position =  countProduct
  } else 
    req.body.position =  parseInt(req.body.position)
  if (req.file)
    req.body["thumbnail"] = `/admin/images/${req.file.filename}`
  const product = new Product(req.body)
  await product.save()
  res.redirect("/admin/products")
}

// [GET] admin/products/detail

module.exports.detail = async (req, res) => {
  const dataProduct = await Product.findOne({
    _id: req.params.id
  })
  res.render("admin/pages/detail/index", {
    titlePage:dataProduct.title, 
    dataProduct

  })
}