const db = require("../models");
const HoaDon = db.HoaDon;
const moment = require("moment");
require("moment/locale/vi");
moment.locale("vi");

exports.create = (req, res) => {
  HoaDon.create({ ...req.body, ngay_lap: moment().format("YYYY-MM-DD") })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
