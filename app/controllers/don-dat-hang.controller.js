const {
  addFieldsListProductsOrder,
  checkProductsOrderAmount,
  addChiTietToDDH,
} = require("../helper/don-dat-hang.helper");
const { resultMergedProducts } = require("../helper/mat-hang.helper");
const db = require("../models");
const DonDatHang = db.DonDatHang;
const CTDonDatHang = db.CTDonDatHang;
const MatHang = db.MatHang;
const moment = require("moment");
const LoaiMatHang = db.LoaiMatHang;
const paypal = require("paypal-rest-sdk");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../helper/constants");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AVcSiMPjqr9Tf43CvhrIuZn1jv7Z9w9RfcteEw1D4EsZIguhGrs4PTRZb8AH09sIsuyTxSBQRd6E1xDn",
  client_secret:
    "ECPDBUREUoV_YNBrOYH2FDbfUMB0ePv4QsxcHWK_7GLiVGyh9SH8bRqJS3oH9Y6dD2vaZ7wydDe8i1XK",
});

require("moment/locale/vi");
moment.locale("vi");

exports.findAll = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);
    const ma_kh = decoded.ma_kh;
    DonDatHang.findAll({
      where: { ma_kh: ma_kh },
      raw: true,
    })
      .then(async (data) => {
        await addChiTietToDDH(data).then((iterableArr) => {
          Promise.all(iterableArr).then((values) => {
            res.status(200).send(values);
          });
        });
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

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  MatHang.findAll({
    include: [
      {
        model: LoaiMatHang,
        attributes: ["ten_loai_mh"],
      },
    ],
    raw: true,
  }).then(async (allProducts) => {
    const resultProducts = await resultMergedProducts(allProducts);
    const {
      dia_chi_giao,
      ho_nguoi_nhan,
      ten_nguoi_nhan,
      sdt,
      ma_kh,
      cac_mat_hang,
    } = req.body;

    const cac_mat_hang_processed = await addFieldsListProductsOrder(
      resultProducts,
      cac_mat_hang
    );

    const isValidAmount = await checkProductsOrderAmount(
      cac_mat_hang_processed
    );
    if (isValidAmount) {
      const donDatHang = {
        ngay_tao: moment().format("YYYY-MM-DD"),
        dia_chi_giao: dia_chi_giao,
        ho_nguoi_nhan: ho_nguoi_nhan,
        ten_nguoi_nhan: ten_nguoi_nhan,
        sdt: sdt,
        ma_kh: ma_kh,
        ma_trang_thai: "CHO_THANH_TOAN",
      };

      DonDatHang.create(donDatHang)
        .then((data) => {
          res.json(data);
          cac_mat_hang_processed.map((product) => {
            product.ma_don_dat_hang = data.ma_don_dat_hang;
            CTDonDatHang.create(product);
            MatHang.update(
              {
                so_luong: product.so_luong - product.so_luong_dat,
              },
              { where: { ma_mh: product.ma_mh } }
            );
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(400).send({
        message: "Số lượng đặt hiện vượt quá số lượng tồn",
      });
    }
  });
};

exports.purchase = async (req, res) => {
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5000/api/don-dat-hang/success",
      cancel_url: "http://localhost:5000/api/don-dat-hang/cancelled",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "This is the payment description.",
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      for (let item of payment.links) {
        if (item.rel === "approval_url") {
          res.send(item.href);
        }
      }
    }
  });
};

exports.success = async (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(error);
    } else {
      if (payment.state === "approved") {
        res.send("payment completed successfully");
        console.log(payment);
      } else {
        res.send("payment not successful");
      }
    }
  });
};

exports.cancelled = async (req, res) => {
  const payerId = req.query.payerId;
  const paymentId = req.query.paymentId;

  res.send("Cancelled");
};
