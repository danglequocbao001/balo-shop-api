module.exports = (app) => {
  const auth = require("../controllers/auth.controller");
  var router = require("express").Router();

  router.post("/login-staff", auth.loginStaff);
  router.post("/login-customer", auth.loginCustomer);
  router.post("/signup-customer", auth.signupCustomer);

  app.use("/api/auth", router);
};
