const { addCusToComment } = require("../helper/binh-luan.helper");
const db = require("../models");
const BinhLuan = db.BinhLuan;

exports.findAll = (req, res) => {
  const ma_mh = req.params.ma_mh;

  BinhLuan.findAll({
    where: { ma_mh: ma_mh },
    raw: true,
  })
    .then(async (binhLuan) => {
      const result = await addCusToComment(binhLuan);
      res
        .status(200)
        .send(result.sort((a, b) => b.ma_binh_luan - a.ma_binh_luan));
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
