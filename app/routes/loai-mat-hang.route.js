const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const loaiMatHang = require("../controllers/loai-mat-hang.controller");
  var router = require("express").Router();

  router.get("/", loaiMatHang.findAll);

  app.use("/api/loai-mat-hang", router);
};
