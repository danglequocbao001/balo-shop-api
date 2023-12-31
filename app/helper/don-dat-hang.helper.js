const { CTDonDatHang, MatHang, TrangThaiDDH, NhanVien } = require("../models");

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

const addFieldsProduct = async (CTDDD) => {
  const result = CTDDD.map(async (item) => {
    const matHang = await MatHang.findOne({
      where: { ma_mh: item.ma_mh },
      raw: true,
    });

    const mat_hang = {
      ma_mh: matHang.ma_mh,
      ten_mh: matHang.ten_mh,
      hinh_anh: matHang.hinh_anh,
    };

    item = { ...item, mat_hang };
    return item;
  });
  return Promise.all(result).then((values) => {
    return values;
  });
};

const addHoaDonToDonDatHang = async (donDatHangArr, hoaDonArr) => {
  const result = donDatHangArr.map((donDatHang) => {
    const hoaDon = hoaDonArr
      .flat()
      .find((hoaDon) => hoaDon.ma_don_dat_hang === donDatHang.ma_don_dat_hang);
    if (hoaDon) {
      return { ...donDatHang, hoa_don: hoaDon };
    } else {
      return donDatHang;
    }
  });
  return result;
};

exports.addChiTietToDDH = async (listDDH, listHoaDon) => {
  let donDatHangArr = await addHoaDonToDonDatHang(listDDH, listHoaDon);
  return donDatHangArr.map(async (ddh) => {
    const CTDDD = await CTDonDatHang.findAll({
      where: { ma_don_dat_hang: ddh.ma_don_dat_hang },
      raw: true,
    });

    const trangThai = await TrangThaiDDH.findOne({
      where: { ma_trang_thai: ddh.ma_trang_thai },
    });

    const chiTiet = await addFieldsProduct(CTDDD);

    const nhanVien = await NhanVien.findOne({
      where: { ma_nv: ddh.ma_nv_giao_hang },
      attributes: ["ma_nv", "email_nv", "ho_nv", "ten_nv"],
    });

    ddh.chi_tiet = chiTiet;
    ddh.tong_tien =
      ddh.chi_tiet.length === 0 ? 0 : await countTotalPriceDDH(ddh.chi_tiet);
    ddh.ten_trang_thai = trangThai.ten_trang_thai;
    ddh.nv_gh = nhanVien;

    return ddh;
  });
};
