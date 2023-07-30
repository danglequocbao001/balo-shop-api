const { JWT_PRIVATE_KEY } = require("../helper/constants");
const db = require("../models");
const KhachHang = db.KhachHang;
const jwt = require("jsonwebtoken");
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

exports.findMe = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);
    const ma_kh = decoded.ma_kh;

    KhachHang.findOne({
      where: { ma_kh: ma_kh },
    })
      .then((data) => {
        delete data.dataValues.mat_khau;
        const response = { ...data.dataValues, ...decoded };
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

exports.findOne = (req, res) => {
  const ma_kh = req.params.ma_kh;
  KhachHang.findOne({
    where: { ma_kh: ma_kh },
  })
    .then((data) => {
      if (data === null) {
        res
          .status(400)
          .send({ message: `Không tìm thấy khách hàng có mã '${ma_kh}'` });
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

exports.update = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);
    const ma_kh = decoded.ma_kh;

    const checkSdtKh = await KhachHang.findOne({
      where: { sdt: req.body.sdt },
    });

    const checkSoIdKh = await KhachHang.findOne({
      where: { so_id: req.body.so_id },
    });

    if (checkSdtKh !== null && checkSdtKh.ma_kh !== ma_kh) {
      res
        .status(400)
        .json({ message: `Số điện thoại ${req.body.sdt} đã tồn tại` });
      return;
    } else if (
      checkSoIdKh !== null &&
      (req.body.so_id !== null || req.body.so_id !== "") &&
      checkSoIdKh.ma_kh !== ma_kh
    ) {
      res
        .status(400)
        .json({ message: `CMND/CCCD/Id ${req.body.so_id} đã tồn tại"` });
      return;
    }

    KhachHang.update(
      {
        ho_kh: req.body.ho_kh,
        ten_kh: req.body.ten_kh,
        dia_chi: req.body.dia_chi,
        sdt: req.body.sdt,
        so_id: req.body.so_id,
      },
      {
        where: { ma_kh: ma_kh },
      }
    )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
