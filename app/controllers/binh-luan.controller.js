const { addCusToComment } = require("../helper/binh-luan.helper");
const { JWT_PRIVATE_KEY } = require("../helper/constants");
const jwt = require("jsonwebtoken");
const db = require("../models");
const BinhLuan = db.BinhLuan;
const ChiTietDonDatHang = db.CTDonDatHang;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
  const ma_mh = req.params.ma_mh;

  let CTDDH = [];

  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);

    const ma_kh = decoded.ma_kh;
    const DDH = await db.DonDatHang.findAll({
      where: { ma_kh: ma_kh },
      raw: true,
    });

    const listIdDDH = DDH.map((item) => {
      return item.ma_don_dat_hang;
    });

    CTDDH = await ChiTietDonDatHang.findAll({
      where: {
        ma_mh: ma_mh,
        ma_don_dat_hang: {
          [Op.in]: listIdDDH,
        },
      },
      raw: true,
    });
  }

  BinhLuan.findAll({
    where: { ma_mh: ma_mh },
    raw: true,
  })
    .then(async (binhLuan) => {
      const result = await addCusToComment(binhLuan);
      res.status(200).send({
        data: result.sort((a, b) => b.ma_binh_luan - a.ma_binh_luan),
        is_can_comment: CTDDH.length > 0 ? true : false,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.create = (req, res) => {
  BinhLuan.create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.delete = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);
    const ma_kh = decoded.ma_kh;
    const ma_binh_luan = parseInt(req.params.ma_binh_luan);

    BinhLuan.destroy({
      where: { ma_kh: ma_kh, ma_binh_luan: ma_binh_luan },
    })
      .then(() => {
        res.status(200).send({ message: "Success!" });
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
