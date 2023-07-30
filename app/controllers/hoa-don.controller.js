const db = require("../models");
const HoaDon = db.HoaDon;

exports.create = (req, res) => {
  HoaDon.create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
