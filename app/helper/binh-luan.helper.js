const { KhachHang } = require("../models");

exports.addCusToComment = async (binhLuan) => {
  const khachHang = await KhachHang.findAll({
    raw: true,
  });
  return binhLuan.map((comment) => {
    const khachHangMatch = khachHang.find((kh) => kh.ma_kh === comment.ma_kh);
    if (khachHangMatch) {
      return {
        ...comment,
        khach_hang: {
          ho_kh: khachHangMatch.ho_kh,
          ten_kh: khachHangMatch.ten_kh,
        },
      };
    }
    return comment;
  });
};
