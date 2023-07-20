const { CTDonDatHang } = require("../models");

exports.addFieldsListProductsOrder = async (
  resultProducts,
  listProductsOrder
) => {
  let result = [];
  for (let i = 0; i < listProductsOrder.length; i++) {
    let obj = listProductsOrder[i];
    let found = resultProducts.find((o) => o.ma_mh === obj.ma_mh);
    if (found) {
      obj.don_gia_dat = found.khuyen_mai
        ? found.khuyen_mai.gia_sau_khi_giam
        : found.thay_doi_gia.gia_dang_ap_dung;
      obj.so_luong = found.so_luong;
      result.push(obj);
    }
  }
  return result;
};

exports.checkProductsOrderAmount = async (arr) => {
  return arr.every((obj) => obj.so_luong_dat <= obj.so_luong);
};

const countTotalPriceDDH = async (ddh) => {
  return ddh
    .map((item) => item.so_luong_dat * item.don_gia_dat)
    .reduce((a, b) => a + b);
};

exports.addChiTietToDDH = async (listDDH) => {
  return listDDH.map(async (ddh) => {
    const CTDDD = await CTDonDatHang.findAll({
      where: { ma_don_dat_hang: ddh.ma_don_dat_hang },
      raw: true,
    });
    ddh.chi_tiet = CTDDD;
    ddh.tong_tien =
      ddh.chi_tiet.length === 0 ? 0 : await countTotalPriceDDH(ddh.chi_tiet);
    return ddh;
  });
};
