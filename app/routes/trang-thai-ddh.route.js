const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const trangThaiDDH = require("../controllers/trang-thai-ddh.controller");
  var router = require("express").Router();

  router.get("/", trangThaiDDH.findAll);

  app.use("/api/trang-thai-ddh", router);
};
