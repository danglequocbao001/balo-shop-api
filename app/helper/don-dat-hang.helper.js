exports.addFieldsListProductsOrder = async (resultProducts, listProductsOrder) => {
  let result = [];
  for (let i = 0; i < listProductsOrder.length; i++) {
    let obj = listProductsOrder[i];
    let found = resultProducts.find((o) => o.ma_mh === obj.ma_mh);
    if (found) {
      obj.don_gia_dat = found.khuyen_mai
        ? found.khuyen_mai.gia_sau_khi_giam
        : found.thay_doi_gia.gia_dang_ap_dung;
      obj.so_luong = found.so_luong + obj.so_luong_dat;
      result.push(obj);
    }
  }
  return result;
};
