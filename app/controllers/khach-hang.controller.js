const db = require("../models");
const KhachHang = db.khachhang;
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

exports.create = (req, res) => {
  if (!req.body.ngay_sinh || !req.body.dia_chi) {
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const khachHang = {
    ma_nv: req.body.ma_nv,
    email_nv: req.body.email_nv,
    ho_nv: req.body.ho_nv,
    ten_nv: req.body.ten_nv,
    ngay_sinh: req.body.ngay_sinh,
    dia_chi: req.body.dia_chi,
    luong: req.body.luong,
    mat_khau: req.body.mat_khau,
    // phone_number: req.body.phone_number,
  };
  KhachHang.create(khachHang)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err.message));
};
