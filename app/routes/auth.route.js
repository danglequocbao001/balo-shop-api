module.exports = (app) => {
  const authController = require("../controllers/auth.controller");
  var router = require("express").Router();

  router.get("/", authController.getCurrentCredential);
  router.post("/login-staff", authController.loginStaff);
  router.post("/login-customer", authController.loginCustomer);
  router.post("/signup-customer", authController.signupCustomer);

  app.use("/api/auth", router);
};
