const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const loaiMatHangController = require("../controllers/loai-mat-hang.controller");
  var router = require("express").Router();

  router.get("/", loaiMatHangController.findAll);

  app.use("/api/loai-mat-hang", router);
};
