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
db.DonDatHang = require("./don-dat-hang.model.js")(sequelize, Sequelize);
db.TrangThaiDDH = require("./trang-thai-ddh.model.js")(sequelize, Sequelize);
db.NhaCungCap = require("./nha-cung-cap.model.js")(sequelize, Sequelize);
db.CTDonDatHang = require("./ct-don-dat-hang.model.js")(sequelize, Sequelize);
db.BoPhanNhanVien = require("./bophan-nhanvien.model.js")(sequelize, Sequelize);
db.BoPhan = require("./bo-phan.model.js")(sequelize, Sequelize);

//foreign keys mat_hang(ma_loai_mh)
db.LoaiMatHang.hasMany(db.MatHang, { foreignKey: "ma_loai_mh" });
db.MatHang.belongsTo(db.LoaiMatHang, { foreignKey: "ma_loai_mh" });
// db.MatHang.hasOne(db.LoaiMatHang, { foreignKey: "ma_loai_mh" });

//foreign keys quang_cao(ma_nv)
db.NhanVien.hasMany(db.QuangCao, { foreignKey: "ma_nv" });
db.QuangCao.belongsTo(db.NhanVien, { foreignKey: "ma_nv" });

//foreign keys don_dat_hang(ma_kh, ma_nv_duyet, ma_nv_giao_hang, ma_trang_thai)
db.KhachHang.hasMany(db.DonDatHang, { foreignKey: "ma_kh" });
db.NhanVien.hasMany(db.DonDatHang, { foreignKey: "ma_nv_duyet" });
db.NhanVien.hasMany(db.DonDatHang, { foreignKey: "ma_nv_giao_hang" });
db.TrangThaiDDH.hasMany(db.DonDatHang, { foreignKey: "ma_trang_thai" });

module.exports = db;
