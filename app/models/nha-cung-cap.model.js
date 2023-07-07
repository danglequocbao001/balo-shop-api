module.exports = (sequelize, Sequelize) => {
  const NhaCungCap = sequelize.define(
    "nha_cung_cap",
    {
      ma_ncc: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      ten_ncc: {
        type: Sequelize.STRING,
      },
      dia_chi: {
        type: Sequelize.STRING,
      },
      sdt: {
        type: Sequelize.STRING,
      },
      email_ncc: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return NhaCungCap;
};
