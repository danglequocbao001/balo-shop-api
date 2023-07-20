module.exports = (sequelize, Sequelize) => {
  const BoPhan = sequelize.define(
    "bo_phan",
    {
      ma_bp: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      ten_bp: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return BoPhan;
};
