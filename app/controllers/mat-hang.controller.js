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
  const { ten_mh, nha_san_xuat, mo_ta, gia, ten_loai_mh } = req.body;
  const options = {
    ten_mh: ten_mh === undefined ? null : ten_mh,
    nha_san_xuat: nha_san_xuat === undefined ? null : nha_san_xuat,
    mo_ta: mo_ta === undefined ? null : mo_ta,
    gia: gia === undefined ? null : gia,
    ten_loai_mh: ten_loai_mh === undefined ? null : ten_loai_mh,
  };

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

      const resultSearched = await searchProducts(resultProducts, options);

      res.status(200).send(resultSearched);
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
  };

  MatHang.create(matHang)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.update = async (req, res) => {
  // const ma_mh = req.params.ma_mh;
  // const { bag_name, category_id, brand_id } = req.body;
  // let checkBagId = await Bags.findOne({ where: { bag_id: bag_id } });
  // if (!checkBagId) {
  //   res.status(400).send({
  //     message: "Bag not exists!",
  //   });
  //   return;
  // }
  // let checkBag = await Bags.findOne({
  //   where: { bag_name: bag_name, bag_id: { [Op.ne]: bag_id } },
  // });
  // if (checkBag) {
  //   res.status(400).send({
  //     message: "Bag already exists!",
  //   });
  //   return;
  // }
  // const bag = {
  //   bag_name: bag_name,
  //   category_id: category_id,
  //   brand_id: brand_id,
  // };
  // Bags.update(bag, { where: { bag_id: bag_id } })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.status(200).send({
  //         message: "Bag updated successfully!",
  //       });
  //     } else {
  //       res.status(400).send({
  //         message: `Cannot update bag with id=${bag_id}. Maybe bag was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => res.status(500).json(err));
};
