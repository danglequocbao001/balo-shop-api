const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const nhanVienController = require("../controllers/nhan-vien.controller");
  var router = require("express").Router();

  router.get("/find-all", nhanVienController.findAll);
  router.get("/find-me", nhanVienController.findMe);
  router.get("/find-one/:ma_nv", nhanVienController.findOne);

  router.post("/", nhanVienController.create);

  app.use("/api/nhan-vien", router);
};
