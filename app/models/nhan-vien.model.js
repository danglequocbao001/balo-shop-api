module.exports = (sequelize, Sequelize) => {
  const NhanVien = sequelize.define(
    "nhan_vien",
    {
      ma_nv: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      email_nv: {
        type: Sequelize.STRING,
      },
      ho_nv: {
        type: Sequelize.STRING,
      },
      ten_nv: {
        type: Sequelize.STRING,
      },
      ngay_sinh: {
        type: Sequelize.STRING,
      },
      dia_chi: {
        type: Sequelize.STRING,
      },
      luong: {
        type: Sequelize.STRING,
      },
      mat_khau: {
        type: Sequelize.STRING,
      },
      dang_hoat_dong: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return NhanVien;
};
