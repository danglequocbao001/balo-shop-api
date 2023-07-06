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
      ma_loai_mh: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return MatHang;
};
