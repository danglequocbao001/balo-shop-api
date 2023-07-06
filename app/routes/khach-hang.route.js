const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const khachHang = require("../controllers/khach-hang.controller");
  var router = require("express").Router();

  router.get("/", khachHang.findAll);
  router.post("/", khachHang.create)

  app.use("/api/khach-hang", router);
};
