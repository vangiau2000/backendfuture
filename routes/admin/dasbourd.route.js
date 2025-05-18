const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/dasbourd.controller")


route.get("/", controller.dasboard)

module.exports = route;