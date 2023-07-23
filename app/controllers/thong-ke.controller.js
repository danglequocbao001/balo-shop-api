const sequelizeManual = require("../helper/sequelize");

exports.findAll = (req, res) => {
  sequelizeManual
    .query("EXEC sp_thong_ke_doanh_thu :ngay_bat_dau, :ngay_ket_thuc", {
      replacements: {
        ngay_bat_dau: req.body.ngay_bat_dau,
        ngay_ket_thuc: req.body.ngay_ket_thuc,
      },
      type: sequelizeManual.QueryTypes.SELECT,
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
