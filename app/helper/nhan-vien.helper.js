exports.addMaBpToNhanVien = (nhanVienObj, boPhanNhanVien) => {
  const found = boPhanNhanVien.find(
    (element) => element.ma_nv === nhanVienObj.ma_nv
  );
  if (found) {
    nhanVienObj.ma_bp = found.ma_bp;
  }
  return nhanVienObj;
};
