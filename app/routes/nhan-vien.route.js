const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const nhanVienController = require("../controllers/nhan-vien.controller");
  var router = require("express").Router();

  router.get("/", roleRequireAdmin, nhanVienController.findAll);
  router.post("/", roleRequireAdmin, nhanVienController.create);

  app.use("/api/nhan-vien", router);
};
