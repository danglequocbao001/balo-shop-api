const sequelizeManual = require("../helper/sequelize");
const { groupDataByDate } = require("../helper/thong-ke.helper");

exports.findAll = (req, res) => {
  sequelizeManual
    .query("EXEC sp_thong_ke_doanh_thu_while :ngay_bat_dau, :ngay_ket_thuc", {
      replacements: {
        ngay_bat_dau: req.body.ngay_bat_dau,
        ngay_ket_thuc: req.body.ngay_ket_thuc,
      },
      type: sequelizeManual.QueryTypes.SELECT,
    })
    .then(async (data) => {
      const result = await groupDataByDate(data, req.body.type);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
