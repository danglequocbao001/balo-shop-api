const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Entity
db.MatHang = require("./mat-hang.model.js")(sequelize, Sequelize);
db.LoaiMatHang = require("./loai-mat-hang.model.js")(sequelize, Sequelize);
db.NhanVien = require("./nhan-vien.model.js")(sequelize, Sequelize);
db.KhachHang = require("./khach-hang.model.js")(sequelize, Sequelize);
db.QuangCao = require("./quang-cao.model.js")(sequelize, Sequelize);

//foreign keys mat_hang(ma_loai_mh)
db.LoaiMatHang.hasMany(db.MatHang, { foreignKey: "ma_loai_mh" });
db.MatHang.belongsTo(db.LoaiMatHang, { foreignKey: "ma_loai_mh" });

//foreign keys quang_cao(ma_nv)
db.NhanVien.hasMany(db.QuangCao, { foreignKey: "ma_nv" });
db.QuangCao.belongsTo(db.NhanVien, { foreignKey: "ma_nv" });

module.exports = db;
