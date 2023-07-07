module.exports = (sequelize, Sequelize) => {
  const CTDonDatHang = sequelize.define(
    "chi_tiet_don_dat_hang",
    {
      ma_ctdh: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ma_mh: {
        type: Sequelize.DATE,
      },
      ma_don_dat_hang: {
        type: Sequelize.INTEGER,
      },
      ma_phieu_tra: {
        type: Sequelize.INTEGER,
      },
      so_luong_tra: {
        type: Sequelize.INTEGER,
      },
      so_luong: {
        type: Sequelize.INTEGER,
      },
      don_gia: {
        type: Sequelize.FLOAT,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return CTDonDatHang;
};
