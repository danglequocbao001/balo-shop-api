const express = require("express");
require("dotenv").config();
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the ecom api shop application." });
});

require("./app/routes/auth.route")(app);
require("./app/routes/mat-hang.route")(app);
require("./app/routes/loai-mat-hang.route")(app);
require("./app/routes/nhan-vien.route")(app);
require("./app/routes/khach-hang.route")(app);
require("./app/routes/quang-cao.route")(app);
require("./app/routes/don-dat-hang.route")(app);
require("./app/routes/trang-thai-ddh.route")(app);
require("./app/routes/nha-cung-cap.route")(app);
require("./app/routes/binh-luan.route")(app);
require("./app/routes/thong-ke.route")(app);
require("./app/routes/hoa-don.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT);
