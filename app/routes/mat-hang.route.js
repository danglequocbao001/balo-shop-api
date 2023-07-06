const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const matHang = require("../controllers/mat-hang.controller");
  var router = require("express").Router();

  router.get("/", matHang.findAll);

  app.use("/api/mat-hang", router);
};
