exports.formatFindPromotions = async (data) => {
  return data[0].map((product) => {
    product.loai_mat_hang = {
      ten_loai_mh: product.ten_loai_mh,
    };
    product.khuyen_mai = {
      ma_km: product.ma_km,
      ngay_bd: product.ngay_bd,
      ngay_kt: product.ngay_kt,
      phan_tram_giam_gia: product.phan_tram_giam_gia,
      gia_sau_khi_giam:
        product.gia * ((100 - product.phan_tram_giam_gia) / 100),
    };
    delete product.ten_loai_mh;
    delete product.ma_km;
    delete product.ngay_bd;
    delete product.ngay_kt;
    delete product.phan_tram_giam_gia;

    return product;
  });
};

exports.mergeNewAndPromotionProducts = async (
  newProducts,
  promotionProducts
) => {
  return newProducts.map((product) => {
    product.loai_mat_hang = {
      ten_loai_mh: product["loai_mat_hang.ten_loai_mh"],
    };
    const matchingPromotionProduct = promotionProducts[0].find(
      (promotionProduct) => promotionProduct.ma_mh === product.ma_mh
    );

    if (matchingPromotionProduct) {
      product.khuyen_mai = {
        ma_km: matchingPromotionProduct.ma_km,
        ngay_bd: matchingPromotionProduct.ngay_bd,
        ngay_kt: matchingPromotionProduct.ngay_kt,
        phan_tram_giam_gia: matchingPromotionProduct.phan_tram_giam_gia,
        gia_sau_khi_giam:
          product.gia *
          ((100 - matchingPromotionProduct.phan_tram_giam_gia) / 100),
      };
      delete product["loai_mat_hang.ten_loai_mh"];

      return product;
    }

    return product;
  });
};

exports.mergeNewAndPromotionAndBestSellerProducts = async (
  newAndPromotionProducts,
  bestSellerProducts
) => {
  return newAndPromotionProducts.map((product) => {
    const matchingNewPromotionProduct = bestSellerProducts[0].find(
      (bestSellerProduct) => bestSellerProduct.ma_mh === product.ma_mh
    );
    if (matchingNewPromotionProduct) {
      product.chi_tiet_da_ban = {
        tong_so_da_ban:
          matchingNewPromotionProduct.tong_so_da_ban,
      };
      return { ...product };
    }
    return product;
  });
};