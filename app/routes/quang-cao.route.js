const { roleRequireAdmin } = require("../helper/roleRequired");

module.exports = (app) => {
  const quangCaoController = require("../controllers/quang-cao.controller");
  var router = require("express").Router();

  router.get("/", quangCaoController.findAll);
  router.post("/", roleRequireAdmin, quangCaoController.create);
  router.delete("/:ma_qc", roleRequireAdmin, quangCaoController.delete);

  app.use("/api/quang-cao", router);
};
