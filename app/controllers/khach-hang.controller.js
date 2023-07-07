const db = require("../models");
const KhachHang = db.KhachHang;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  KhachHang.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
