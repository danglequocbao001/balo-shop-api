const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const nhaCungCapController = require("../controllers/nha-cung-cap.controller");
  var router = require("express").Router();

  router.get("/", nhaCungCapController.findAll);
  router.post("/", nhaCungCapController.create);

  app.use("/api/nha-cung-cap", router);
};
