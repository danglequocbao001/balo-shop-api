module.exports = (sequelize, Sequelize) => {
  const LoaiMatHang = sequelize.define(
    "loai_mat_hang",
    {
      ma_loai_mh: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      ten_loai_mh: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return LoaiMatHang;
};
