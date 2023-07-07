const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const donDatHangController = require("../controllers/don-dat-hang.controller");
  var router = require("express").Router();

  router.get("/", donDatHangController.findAll);
  router.post("/", donDatHangController.create);

  app.use("/api/don-dat-hang", router);
};
