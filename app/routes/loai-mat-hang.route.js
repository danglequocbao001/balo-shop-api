const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const loaiMatHangController = require("../controllers/loai-mat-hang.controller");
  var router = require("express").Router();

  router.get("/", loaiMatHangController.findAll);
  router.post("/", loaiMatHangController.create);
  router.put("/", loaiMatHangController.update);

  app.use("/api/loai-mat-hang", router);
};
