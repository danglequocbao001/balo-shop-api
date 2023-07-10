const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const matHangController = require("../controllers/mat-hang.controller");
  var router = require("express").Router();

  router.get("/find-new", matHangController.findNew);
  router.get("/:ma_mh", matHangController.findOne);
  router.get("/", matHangController.findAll);
  router.post("/", roleRequireAdmin, matHangController.create);

  app.use("/api/mat-hang", router);
};
