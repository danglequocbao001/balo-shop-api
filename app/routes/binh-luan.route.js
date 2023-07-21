module.exports = (app) => {
  const binhLuanController = require("../controllers/binh-luan.controller");
  var router = require("express").Router();

  router.get("/:ma_mh", binhLuanController.findAll);
  router.post("/", binhLuanController.create);
  router.delete("/:ma_binh_luan", binhLuanController.delete);

  app.use("/api/binh-luan", router);
};
