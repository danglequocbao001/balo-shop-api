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
const HoaDon = db.HoaDon;
const moment = require("moment");
const LoaiMatHang = db.LoaiMatHang;
const paypal = require("paypal-rest-sdk");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../helper/constants");
const CC = require("currency-converter-lt");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AVcSiMPjqr9Tf43CvhrIuZn1jv7Z9w9RfcteEw1D4EsZIguhGrs4PTRZb8AH09sIsuyTxSBQRd6E1xDn",
  client_secret:
    "ECPDBUREUoV_YNBrOYH2FDbfUMB0ePv4QsxcHWK_7GLiVGyh9SH8bRqJS3oH9Y6dD2vaZ7wydDe8i1XK",
});

require("moment/locale/vi");
moment.locale("vi");

exports.findAll = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const customerToken = req.headers.authorization;
    const token = customerToken.split(" ");
    const decoded = jwt.verify(token[0], JWT_PRIVATE_KEY);

    const ma_nv = decoded.ma_nv;
    const ma_kh = decoded.ma_kh;

    const listHoaDon = await HoaDon.findAll({
      raw: true,
    });

    if (ma_kh) {
      DonDatHang.findAll({
        where: { ma_kh: ma_kh },
        raw: true,
      })
        .then(async (listDDH) => {
          await addChiTietToDDH(listDDH, listHoaDon).then((iterableArr) => {
            Promise.all(iterableArr).then((values) => {
              res
                .status(200)
                .send(
                  values.sort((a, b) => b.ma_don_dat_hang - a.ma_don_dat_hang)
                );
            });
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    } else if (ma_nv) {
      DonDatHang.findAll({
        raw: true,
      })
        .then(async (listDDH) => {
          await addChiTietToDDH(listDDH, listHoaDon).then((iterableArr) => {
            Promise.all(iterableArr).then((values) => {
              res
                .status(200)
                .send(
                  values.sort((a, b) => b.ma_don_dat_hang - a.ma_don_dat_hang)
                );
            });
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

exports.findOne = async (req, res) => {
  const ma_don_dat_hang = req.params.ma_don_dat_hang;
  if (req.headers && req.headers.authorization) {
    const listHoaDon = await HoaDon.findAll({
      raw: true,
    });
    DonDatHang.findAll({
      raw: true,
    })
      .then(async (listDDH) => {
        await addChiTietToDDH(listDDH, listHoaDon).then((iterableArr) => {
          Promise.all(iterableArr).then((values) => {
            res
              .status(200)
              .send(
                values.filter(
                  (item) => item.ma_don_dat_hang === parseInt(ma_don_dat_hang)
                )
              );
          });
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
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
          res.status(200).json(data);
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
  const tong_tien = req.body.tong_tien;
  const ma_don_dat_hang = req.body.ma_don_dat_hang;
  let currencyConverter = new CC({
    from: "VND",
    to: "USD",
    amount: parseInt(tong_tien),
  });
  currencyConverter.convert().then((moneyUSD) => {
    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `http://localhost:5000/api/don-dat-hang/success/${ma_don_dat_hang}`,
        cancel_url: "http://localhost:5000/api/don-dat-hang/cancelled",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Thanh toán mặt hàng",
                sku: "Thanh toán mặt hàng",
                price: moneyUSD.toFixed(2).toString(),
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: moneyUSD.toFixed(2).toString(),
          },
          description: "Thanh toán đơn hàng",
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let item of payment.links) {
          if (item.rel === "approval_url") {
            res.send(item.href);
          }
        }
      }
    });
  });
};

exports.success = async (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };
  const ma_don_dat_hang = req.params.ma_don_dat_hang;

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(error);
    } else {
      if (payment.state === "approved") {
        DonDatHang.update(
          {
            ma_trang_thai: "CHO_DUYET",
          },
          { where: { ma_don_dat_hang: ma_don_dat_hang } }
        );
        res.send("Thanh toán thành công!");
      } else {
        res.send("Thanh toán thất bại!");
      }
    }
  });
};

exports.cancelled = async (req, res) => {
  res.send(
    "Đã dừng thanh toán, hãy tiếp tục thanh toán để nhân viên có thể duyệt đơn hàng!"
  );
};

exports.browse = (req, res) => {
  const ma_don_dat_hang = req.body.ma_don_dat_hang;
  const ma_nv_duyet = req.body.ma_nv_duyet;
  const ma_nv_giao_hang = req.body.ma_nv_giao_hang;

  DonDatHang.update(
    {
      ma_nv_duyet: ma_nv_duyet,
      ma_nv_giao_hang: ma_nv_giao_hang,
      ma_trang_thai: "CHO_GIAO_HANG",
    },
    { where: { ma_don_dat_hang: ma_don_dat_hang } }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).json(err));
};

exports.delivered = (req, res) => {
  const ma_don_dat_hang = req.params.ma_don_dat_hang;
  const thoi_gian_giao = moment().format("YYYY-MM-DD");
  DonDatHang.update(
    {
      thoi_gian_giao: thoi_gian_giao,
      ma_trang_thai: "DA_HOAN_THANH",
    },
    { where: { ma_don_dat_hang: ma_don_dat_hang } }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).json(err.message));
};
