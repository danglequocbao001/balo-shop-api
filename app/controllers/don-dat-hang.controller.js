const db = require("../models");
const DonDatHang = db.DonDatHang;

exports.findAll = (req, res) => {
  DonDatHang.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
      console.log(err);
    });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const donDatHang = {
    ma_kh: req.body.ma_kh,
    ngay_tao: req.body.ngay_tao,
    dia_chi_giao: req.body.dia_chi_giao,
    ho_nguoi_nhan: req.body.ho_nguoi_nhan,
    ten_nguoi_nhan: req.body.ten_nguoi_nhan,
    sdt: req.body.sdt,
    ma_trang_thai: "CHO_THANH_TOAN",
    thoi_gian_giao: null,
    ma_nv_duyet: null,
    ma_nv_giao_hang: null,
  };

  DonDatHang.create(donDatHang)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
};
