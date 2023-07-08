const db = require("../models");
const NhaCungCap = db.NhaCungCap;

exports.findAll = (req, res) => {
  NhaCungCap.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.create = async (req, res) => {
  const { ma_ncc, sdt, email_ncc } = req.body;
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const checkMaNCC = await NhaCungCap.findOne({
    where: { ma_ncc: ma_ncc },
  });
  const checkSdt = await NhaCungCap.findOne({
    where: { sdt: sdt },
  });
  const checkEmailNCC = await NhaCungCap.findOne({
    where: { email_ncc: email_ncc },
  });

  if (checkMaNCC) {
    res.status(401).json({ message: "Mã nhà cung cấp đã tồn tại" });
    return;
  } else if (checkSdt) {
    res.status(401).json({ message: "SDT nhà cung cấp đã tồn tại" });
    return;
  } else if (checkEmailNCC) {
    res.status(401).json({ message: "Email nhà cung cấp đã tồn tại" });
    return;
  }

  const nhaCungCap = {
    ma_ncc: req.body.ma_ncc,
    ten_ncc: req.body.ten_ncc,
    dia_chi: req.body.dia_chi,
    sdt: req.body.sdt,
    email_ncc: req.body.email_ncc,
  };

  NhaCungCap.create(nhaCungCap)
    .then(() =>
      res.json({
        message: "Tạo nhà cung cấp thành công",
      })
    )
    .catch((err) => res.status(500).json(err.message));
};
