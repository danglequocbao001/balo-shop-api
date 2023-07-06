const db = require("../models");
const QuangCao = db.QuangCao;
const Op = db.Sequelize.Op;

exports.findAll = (res) => {
  QuangCao.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const quangCao = {
    ten_qc: req.body.ten_qc,
    ngay_tao: req.body.ngay_tao,
    noi_dung: req.body.noi_dung,
    hinh_anh: req.body.hinh_anh,
    ma_nv: req.body.ma_nv,
  };

  QuangCao.create(quangCao)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
};

//TODO
// exports.update = (req, res) => {
//   const ma_qc = req.params.ma_qc;

//   QuangCao.update(req.body, {
//     where: { ma_qc: ma_qc },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id,
//       });
//     });
// };

exports.delete = (req, res) => {
  const ma_qc = req.params.ma_qc;

  QuangCao.destroy({
    where: { ma_qc: ma_qc },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Xóa quảng cáo thành công!",
        });
      } else {
        res.send({
          message: `Không xóa được quảng cáo với id=${ma_qc}. Có thể quảng cáo không tồn tại!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Không thể xóa quảng cáo với id=" + ma_qc,
      });
    });
};
