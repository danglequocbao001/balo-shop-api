const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const matHangController = require("../controllers/mat-hang.controller");
  var router = require("express").Router();

  router.get("/", matHangController.findAll);
  router.post("/", matHangController.create);

  app.use("/api/mat-hang", router);
};
