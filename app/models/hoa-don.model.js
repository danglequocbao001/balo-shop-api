module.exports = (sequelize, Sequelize) => {
  const HoaDon = sequelize.define(
    "hoa_don",
    {
      ma_hoa_don: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      ngay_lap: {
        type: Sequelize.DATE,
      },
      hoa_don_do: {
        type: Sequelize.INTEGER,
      },
      mst: {
        type: Sequelize.STRING,
      },
      ho_mst: {
        type: Sequelize.STRING,
      },
      ten_mst: {
        type: Sequelize.STRING,
      },
      ma_nv: {
        type: Sequelize.STRING,
      },
      ma_don_dat_hang: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return HoaDon;
};
