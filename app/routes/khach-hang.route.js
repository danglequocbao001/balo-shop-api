const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const khachHangController = require("../controllers/khach-hang.controller");
  var router = require("express").Router();

  router.get("/", roleRequireAdmin, khachHangController.findAll);
  router.post("/", khachHangController.create);

  app.use("/api/khach-hang", router);
};
