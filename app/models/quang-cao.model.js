module.exports = (sequelize, Sequelize) => {
  const QuangCao = sequelize.define(
    "quang_cao",
    {
      ma_qc: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ten_qc: {
        type: Sequelize.STRING,
      },
      ngay_tao: {
        type: Sequelize.DATE,
      },
      noi_dung: {
        type: Sequelize.STRING,
      },
      hinh_anh: {
        type: Sequelize.STRING,
      },
      ma_nv: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return QuangCao;
};
