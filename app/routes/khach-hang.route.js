const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const khachHangController = require("../controllers/khach-hang.controller");
  var router = require("express").Router();

  router.get("/find-all", khachHangController.findAll);
  router.get("/find-me", khachHangController.findMe);
  router.get("/find-one/:ma_kh", khachHangController.findOne);

  app.use("/api/khach-hang", router);
};
