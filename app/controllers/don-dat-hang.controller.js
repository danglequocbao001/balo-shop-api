const db = require("../models");
const DonDatHang = db.DonDatHang;
const CTDonDatHang = db.CTDonDatHang;
const MatHang = db.MatHang;
const moment = require("moment");
require("moment/locale/vi");
moment.locale("vi");

exports.findAll = (req, res) => {
  DonDatHang.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const {
    dia_chi_giao,
    ho_nguoi_nhan,
    ten_nguoi_nhan,
    sdt,
    ma_kh,
    cac_mat_hang,
  } = req.body;

  const donDatHang = {
    ngay_tao: moment().format("YYYY-MM-DD"),
    dia_chi_giao: dia_chi_giao,
    ho_nguoi_nhan: ho_nguoi_nhan,
    ten_nguoi_nhan: ten_nguoi_nhan,
    sdt: sdt,
    ma_kh: ma_kh,
    ma_trang_thai: "CHO_THANH_TOAN",
  };

  DonDatHang.create(donDatHang)
    .then((data) => {
      res.json(data);
      cac_mat_hang.map((product) => {
        product.ma_don_dat_hang = data.ma_don_dat_hang;
        CTDonDatHang.create(product);
        MatHang.update(
          {
            so_luong: product.so_luong - product.so_luong_dat,
          },
          { where: { ma_mh: product.ma_mh } }
        );
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
