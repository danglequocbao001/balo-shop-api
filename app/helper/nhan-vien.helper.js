exports.addMaBpToNhanVien = (nhanVienObj, boPhanNhanVien, boPhan) => {
  const found = boPhanNhanVien.find(
    (element) => element.ma_nv === nhanVienObj.ma_nv
  );
  if (found) {
    nhanVienObj.ma_bp = found.ma_bp;
    const foundTenBP = boPhan.find((item) => item.ma_bp === nhanVienObj.ma_bp);
    if (foundTenBP) {
      nhanVienObj.ten_bp = foundTenBP.ten_bp;
    }
  }
  return nhanVienObj;
};
