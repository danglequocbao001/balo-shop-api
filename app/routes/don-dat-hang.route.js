const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const donDatHangController = require("../controllers/don-dat-hang.controller");
  var router = require("express").Router();

  router.get("/", donDatHangController.findAll);
  router.post("/", donDatHangController.create);
  router.post("/purchase", donDatHangController.purchase);
  router.get("/success/:ma_don_dat_hang", donDatHangController.success);
  router.get("/cancelled", donDatHangController.cancelled);
  router.get("/find-one/:ma_don_dat_hang", donDatHangController.findOne);

  app.use("/api/don-dat-hang", router);
};
