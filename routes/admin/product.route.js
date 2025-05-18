const express = require("express")
const route = express.Router();
const controller = require("../../controllers/admin/product.controller")
const multer  = require('multer')
const storageMulter = require("../../helpers/storage")
const upload = multer({ storage: storageMulter() })
const middleware = require("../../middleware/admin/product.middleware")

route.get("/", controller.index )
route.patch("/changestatus/:status/:id", controller.changeStatus)
route.patch("/change-status-mutil", controller.changeStatusMutil)
route.patch("/position/:id/:position", controller.position)
route.get("/deleted", controller.deleted)
route.get("/create", controller.createView)
route.post("/create",upload.single('thumbnail'),middleware.title, controller.createPost)
route.get("/detail/:id", controller.detail)


module.exports = route;