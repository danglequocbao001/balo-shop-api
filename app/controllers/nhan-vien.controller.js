const db = require("../models");
const NhanVien = db.nhanvien;
const Op = db.Sequelize.Op;

exports.findAll = (res) => {
  NhanVien.findAll()
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
  const nhanVien = {
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
  NhanVien.create(nhanVien)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err.message));
};
