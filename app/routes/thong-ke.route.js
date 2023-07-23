const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const thongKeController = require("../controllers/thong-ke.controller");
  var router = require("express").Router();

  router.post("/", thongKeController.findAll);

  app.use("/api/thong-ke", router);
};
