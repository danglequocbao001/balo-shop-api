const { JWT_PRIVATE_KEY } = require("../helper/constants");
const db = require("../models");
const KhachHang = db.KhachHang;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
  KhachHang.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.findMe = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);
    const ma_kh = decoded.ma_kh;

    KhachHang.findOne({ ma_kh: ma_kh })
      .then((data) => {
        const response = { ...data.dataValues, ...decoded };
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

exports.findOne = (req, res) => {
  const ma_kh = req.params.ma_kh;
  KhachHang.findOne({
    where: { ma_kh: ma_kh },
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

// exports.updateByUser = async (req, res) => {
//   if (!req.user) {
//     res.status(400).send({
//       message: "User is not logged in!",
//     });
//   }
//   const ma_kh = req.khach_hang.ma_kh;
//   const { username, email, phone_number } = req.body;
//   if (!username || !email || !phone_number) {
//     res.status(401).json({ message: "Invalid credentials" });
//     return;
//   }
//   let checkUsername = await Accounts.findOne({
//     where: { username: username, account_id: { [Op.ne]: account_id } },
//   });
//   if (checkUsername) {
//     res.status(401).json({ message: "Username already exists" });
//     return;
//   }
//   let checkEmail = await Accounts.findOne({
//     where: { email: email, account_id: { [Op.ne]: account_id } },
//   });
//   if (checkEmail) {
//     res.status(401).json({ message: "Email already used" });
//     return;
//   }
//   let checkPhoneNumber = await Accounts.findOne({
//     where: { phone_number: phone_number, account_id: { [Op.ne]: account_id } },
//   });
//   if (checkPhoneNumber) {
//     res.status(401).json({ message: "Phone number already used" });
//     return;
//   }
//   const newAccount = {
//     username: username,
//     email: email,
//     phone_number: phone_number,
//   };

//   Accounts.update(newAccount, { where: { account_id: account_id } })
//     .then((num) => {
//       if (num == 1) {
//         res.status(200).send({
//           message: "Account updated successfully!",
//         });
//       } else {
//         res.status(404).send({
//           message: `Cannot update account with id=${account_id}. Maybe account was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err });
//     });
// };
