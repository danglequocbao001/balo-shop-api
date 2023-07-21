module.exports = (sequelize, Sequelize) => {
  const BinhLuan = sequelize.define(
    "binh_luan",
    {
      ma_binh_luan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ma_kh: {
        type: Sequelize.INTEGER,
      },
      ma_mh: {
        type: Sequelize.STRING,
      },
      noi_dung: {
        type: Sequelize.STRING,
      },
      diem_danh_gia: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return BinhLuan;
};
