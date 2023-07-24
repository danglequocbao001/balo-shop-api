const { LoaiMatHang } = require(".");

module.exports = (sequelize, Sequelize) => {
  const MatHang = sequelize.define(
    "mat_hang",
    {
      ma_mh: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      ten_mh: {
        type: Sequelize.STRING,
      },
      nha_san_xuat: {
        type: Sequelize.STRING,
      },
      hinh_anh: {
        type: Sequelize.STRING,
      },
      mo_ta: {
        type: Sequelize.STRING,
      },
      so_luong: {
        type: Sequelize.INTEGER,
      },
      gia: {
        type: Sequelize.FLOAT,
      },
      is_new: {
        type: Sequelize.INTEGER,
      },
      is_active: {
        type: Sequelize.INTEGER,
      },
      ma_loai_mh: {
        type: Sequelize.STRING,
        references: {
          model: LoaiMatHang,
          key: "ma_loai_mh",
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return MatHang;
};
