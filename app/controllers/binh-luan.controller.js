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
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
