const { JWT_PRIVATE_KEY } = require("../helper/constants");
const {
  addMaBpToNhanVien,
  addBoPhanField,
} = require("../helper/nhan-vien.helper");
const db = require("../models");
const NhanVien = db.NhanVien;
const BoPhanNhanVien = db.BoPhanNhanVien;
const BoPhan = db.BoPhan;
const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
  NhanVien.findAll({
    raw: true,
  })
    .then(async (nhanVien) => {
      const boPhannNhanVien = await BoPhanNhanVien.findAll({
        raw: true,
      });
      const result = await addBoPhanField(boPhannNhanVien, nhanVien);

      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.findMe = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const staffToken = req.headers.authorization;
    const token = staffToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);
    const ma_nv = decoded.ma_nv;

    BoPhanNhanVien.findAll({
      raw: true,
    }).then((boPhanNhanVien) => {
      NhanVien.findOne({ where: { ma_nv: ma_nv } })
        .then(async (nhanVien) => {
          delete nhanVien.dataValues.mat_khau;
          delete nhanVien.dataValues.luong;
          const boPhan = await BoPhan.findAll({
            raw: true,
          });
          const response = { ...nhanVien.dataValues, ...decoded };

          const result = addMaBpToNhanVien(response, boPhanNhanVien, boPhan);

          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send({
            message: err,
          });
        });
    });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

exports.findOne = (req, res) => {
  const ma_nv = req.params.ma_nv;
  NhanVien.findOne({
    where: { ma_nv: ma_nv },
  })
    .then((data) => {
      if (data === null) {
        res
          .status(400)
          .send({ message: `Không tìm thấy nhân viên có mã '${ma_nv}'` });
      } else {
        res.status(200).send(data);
      }
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
  };
  NhanVien.create(nhanVien)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err.message));
};
