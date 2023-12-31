const { JWT_PRIVATE_KEY } = require("../helper/constants");
const db = require("../models");
const NhanVien = db.NhanVien;
const KhachHang = db.KhachHang;
const jwt = require("jsonwebtoken");

exports.loginStaff = async (req, res) => {
  const { email_nv, mat_khau } = req.body;
  const nhanvien = await NhanVien.findOne({
    where: { email_nv: email_nv },
  });
  if (!nhanvien) {
    res.status(401).json({ message: "Tài khoản không tồn tại" });
    return;
  }
  if (mat_khau !== nhanvien.mat_khau) {
    res.status(401).json({ message: "Sai mật khẩu" });
    return;
  }
  const authorization = jwt.sign(
    {
      ma_nv: nhanvien.ma_nv,
      email_nv: nhanvien.email_nv,
      role: "staff",
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "72h" }
  );
  res.status(200).json({ authorization: authorization });
};

exports.loginCustomer = async (req, res) => {
  const { email_kh, mat_khau } = req.body;
  const khachhang = await KhachHang.findOne({
    where: { email_kh: email_kh },
  });
  if (!khachhang) {
    res.status(401).json({ message: "Tài khoản không tồn tại" });
    return;
  }
  if (mat_khau !== khachhang.mat_khau) {
    res.status(401).json({ message: "Sai mật khẩu" });
    return;
  }
  const authorization = jwt.sign(
    {
      ma_kh: khachhang.ma_kh,
      email_kh: khachhang.email_kh,
      role: "customer",
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "72h" }
  );
  res.status(200).json({ authorization: authorization });
};

exports.signupCustomer = async (req, res) => {
  const { email_kh, sdt, so_id } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "Content can not be empty!" });
    return;
  }

  const checkEmailKh = await KhachHang.findOne({
    where: { email_kh: email_kh },
  });
  const checkEmailKhInEmailNv = await NhanVien.findOne({
    where: { email_nv: email_kh },
  });
  const checkSdtKh = await KhachHang.findOne({
    where: { sdt: sdt },
  });
  const checkSoIdKh = await KhachHang.findOne({
    where: { so_id: so_id },
  });

  if (checkEmailKh || checkEmailKhInEmailNv) {
    res.status(400).json({ message: `Email ${email_kh} đã tồn tại` });
    return;
  } else if (checkSdtKh) {
    res.status(400).json({ message: `Số điện thoại ${sdt} đã tồn tại` });
    return;
  } else if (so_id !== null && checkSoIdKh) {
    res.status(400).json({ message: `CMND/CCCD/Id ${so_id} đã tồn tại"` });
    return;
  }

  const khachHang = { ...req.body };

  KhachHang.create(khachHang)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.getCurrentCredential = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);

    res.status(200).send(decoded);
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
