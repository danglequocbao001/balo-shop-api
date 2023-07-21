const db = require("../models");
const LoaiMatHang = db.LoaiMatHang;

exports.findAll = (req, res) => {
  LoaiMatHang.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
