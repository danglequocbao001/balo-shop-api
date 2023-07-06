const db = require("../models");
const NhanVien = db.NhanVien;
const KhachHang = db.KhachHang;
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

exports.loginStaff = async (req, res) => {
  const { email_nv, mat_khau } = req.body;
  const nhanvien = await NhanVien.findOne({
    where: { [Op.or]: [{ email_nv: email_nv }] },
  });
  if (!nhanvien) {
    res.status(401).json({ message: "Tài khoản không tồn tại" });
    return;
  }
  if (mat_khau !== nhanvien.mat_khau) {
    res.status(401).json({ message: "Sai mật khẩu" });
    return;
  }
  const accessToken = jwt.sign(
    {
      ma_nv: nhanvien.ma_nv,
      email_nv: nhanvien.email_nv,
      role_id: 1,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "72h" }
  );
  res.status(200).json({ access_token: accessToken });
};

exports.loginCustomer = async (req, res) => {
  const { email_kh, mat_khau } = req.body;
  const khachhang = await KhachHang.findOne({
    where: { [Op.or]: [{ email_kh: email_kh }] },
  });
  if (!khachhang) {
    res.status(401).json({ message: "Tài khoản không tồn tại" });
    return;
  }
  if (mat_khau !== khachhang.mat_khau) {
    res.status(401).json({ message: "Sai mật khẩu" });
    return;
  }
  const accessToken = jwt.sign(
    {
      ma_kh: khachhang.ma_kh,
      email_kh: khachhang.email_kh,
      role_id: 2,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "72h" }
  );
  res.status(200).json({ access_token: accessToken });
};

exports.signupCustomer = async (req, res) => {
  const { email_kh, sdt, so_id } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "Content can not be empty!" });
    return;
  }

  let checkEmailKh = await KhachHang.findOne({ where: { email_kh: email_kh } });
  let checkEmailKhInEmailNv = await NhanVien.findOne({
    where: { email_nv: email_kh },
  });
  if (checkEmailKh || checkEmailKhInEmailNv) {
    res.status(401).json({ message: "Email đã tồn tại" });
    return;
  }

  let checkSdtKh = await KhachHang.findOne({
    where: { sdt: sdt },
  });
  if (checkSdtKh) {
    res.status(401).json({ message: "Phone number already used" });
    return;
  }

  const newAccount = { ...req.body };

  KhachHang.create(newAccount)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
