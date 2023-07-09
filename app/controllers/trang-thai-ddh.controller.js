const db = require("../models");
const TrangThaiDDH = db.TrangThaiDDH;

exports.findAll = (req, res) => {
  TrangThaiDDH.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
