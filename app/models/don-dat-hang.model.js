module.exports = (sequelize, Sequelize) => {
  const DonDatHang = sequelize.define(
    "don_dat_hang",
    {
      ma_don_dat_hang: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ngay_tao: {
        type: Sequelize.DATE,
      },
      dia_chi_giao: {
        type: Sequelize.STRING,
      },
      thoi_gian_giao: {
        type: Sequelize.DATE,
      },
      ho_nguoi_nhan: {
        type: Sequelize.STRING,
      },
      ten_nguoi_nhan: {
        type: Sequelize.STRING,
      },
      sdt: {
        type: Sequelize.STRING,
      },
      ma_kh: {
        type: Sequelize.INTEGER,
      },
      ma_trang_thai: {
        type: Sequelize.STRING,
      },
      ma_nv_duyet: {
        type: Sequelize.STRING,
      },
      ma_nv_giao_hang: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return DonDatHang;
};
