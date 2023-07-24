const db = require("../models");
const MatHang = db.MatHang;
const LoaiMatHang = db.LoaiMatHang;
const {
  resultMergedProducts,
  searchProducts,
} = require("../helper/mat-hang.helper");

exports.findAll = (req, res) => {
  MatHang.findAll({
    include: [
      {
        model: LoaiMatHang,
        attributes: ["ten_loai_mh"],
      },
    ],
    raw: true,
  })
    .then(async (allProducts) => {
      const resultProducts = await resultMergedProducts(allProducts);

      res.status(200).send(resultProducts);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.search = (req, res) => {
  MatHang.findAll({
    include: [
      {
        model: LoaiMatHang,
        attributes: ["ten_loai_mh"],
      },
    ],
    raw: true,
  })
    .then(async (allProducts) => {
      const resultProducts = await resultMergedProducts(allProducts);

      const resultSearched = await searchProducts(resultProducts, req.body);

      res
        .status(200)
        .send(resultSearched.filter((product) => product.so_luong !== 0));
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.findOne = (req, res) => {
  const ma_mh = req.params.ma_mh;
  MatHang.findAll({
    include: [
      {
        model: LoaiMatHang,
        attributes: ["ten_loai_mh"],
      },
    ],
    raw: true,
  })
    .then(async (allProducts) => {
      const resultProducts = await resultMergedProducts(allProducts);

      res
        .status(200)
        .send(resultProducts.filter((product) => product.ma_mh === ma_mh)[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let checkMaMH = await MatHang.findOne({ where: { ma_mh: req.body.ma_mh } });
  let checkTenMH = await MatHang.findOne({
    where: { ten_mh: req.body.ten_mh },
  });

  if (checkMaMH) {
    res.status(400).send({
      message: "Mã mặt hàng đã tồn tại",
    });
    return;
  } else if (checkTenMH) {
    res.status(400).send({
      message: "Tên mặt hàng đã tồn tại",
    });
    return;
  }

  const matHang = {
    ma_mh: req.body.ma_mh,
    ten_mh: req.body.ten_mh,
    nha_san_xuat: req.body.nha_san_xuat,
    hinh_anh: req.body.hinh_anh,
    mo_ta: req.body.mo_ta,
    ma_loai_mh: req.body.ma_loai_mh,
    gia: req.body.gia,
    so_luong: req.body.so_luong,
    is_new: req.body.is_new,
    is_active: req.body.is_active,
  };

  MatHang.create(matHang)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.update = async (req, res) => {
  MatHang.update(
    {
      ma_loai_mh: req.body.ma_loai_mh,
      ten_mh: req.body.ten_mh,
      nha_san_xuat: req.body.nha_san_xuat,
      hinh_anh: req.body.hinh_anh,
      mo_ta: req.body.mo_ta,
      is_new: req.body.is_new,
      is_active: req.body.is_active,
    },
    { where: { ma_mh: req.body.ma_mh } }
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
