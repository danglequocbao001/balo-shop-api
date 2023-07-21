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

exports.addBoPhanField = async (boPhanNhanVien, nhanVien) => {
  return nhanVien.map((secondObj) => {
    const firstObj = boPhanNhanVien.find(
      (firstObj) => firstObj.ma_nv === secondObj.ma_nv
    );
    if (firstObj) {
      return { ...secondObj, bo_phan: firstObj };
    }
    return secondObj;
  });
};
