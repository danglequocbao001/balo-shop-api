const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const nhanVien = require("../controllers/nhan-vien.controller");
  var router = require("express").Router();

  router.get("/", nhanVien.findAll);
  router.post("/", nhanVien.create);

  app.use("/api/nhan-vien", router);
};
