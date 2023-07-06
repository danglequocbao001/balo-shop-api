module.exports = (sequelize, Sequelize) => {
  const KhachHang = sequelize.define(
    "khach_hang",
    {
      ma_kh: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email_kh: {
        type: Sequelize.STRING,
      },
      ho_kh: {
        type: Sequelize.STRING,
      },
      ten_kh: {
        type: Sequelize.STRING,
      },
      dia_chi: {
        type: Sequelize.STRING,
      },
      sdt: {
        type: Sequelize.INTEGER,
      },
      so_id: {
        type: Sequelize.INTEGER,
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
  return KhachHang;
};
