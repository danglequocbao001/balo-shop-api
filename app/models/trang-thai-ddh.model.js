module.exports = (sequelize, Sequelize) => {
  const TrangThaiDDH = sequelize.define(
    "trang_thai_don_dat_hang",
    {
      ma_trang_thai: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      ten_trang_thai: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return TrangThaiDDH;
};
