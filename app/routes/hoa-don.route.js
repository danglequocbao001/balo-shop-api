module.exports = (app) => {
  const hoaDonController = require("../controllers/hoa-don.controller");
  var router = require("express").Router();

  router.post("/", hoaDonController.create);

  app.use("/api/loai-mat-hang", router);
};
