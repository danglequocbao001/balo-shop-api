module.exports = (app) => {
  const binhLuanController = require("../controllers/binh-luan.controller");
  var router = require("express").Router();

  router.get("/:ma_mh", binhLuanController.findAll);

  app.use("/api/binh-luan", router);
};
