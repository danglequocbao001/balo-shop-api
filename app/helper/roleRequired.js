const jwt = require("jsonwebtoken");

const roleRequireCustomer = (req, res, next) => {
  const token = req.header("authorization");
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Tài khoản không có quyền truy cập" });
    } else {
      req.user = user;
      if (req.user.role !== "customer")
        res.status(403).json({ message: "Tài khoản không có quyền truy cập" });
      next();
    }
  });
};

const roleRequireAdmin = (req, res, next) => {
  const token = req.header("authorization");
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Tài khoản không có quyền truy cập" });
    } else {
      req.user = user;
      if (req.user.role !== "staff")
        res.status(403).json({ message: "Tài khoản không có quyền truy cập" });
      next();
    }
  });
};

const roleRequire = (req, res, next) => {
  const token = req.header("authorization");
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Forbidden" });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = {
  roleRequireCustomer,
  roleRequireAdmin,
  roleRequire,
};
