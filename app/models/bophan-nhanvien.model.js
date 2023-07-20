module.exports = (sequelize, Sequelize) => {
  const BoPhanNhanVien = sequelize.define(
    "bophan_nhanvien",
    {
      ma_bp: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      ma_nv: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      ngay_dieu_chuyen: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return BoPhanNhanVien;
};
