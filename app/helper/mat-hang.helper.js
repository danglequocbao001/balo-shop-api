const sequelizeManual = require("./sequelize");

//no in using
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
        product.thay_doi_gia.gia_dang_ap_dung *
        ((100 - product.phan_tram_giam_gia) / 100),
    };
    delete product.ten_loai_mh;
    delete product.ma_km;
    delete product.ngay_bd;
    delete product.ngay_kt;
    delete product.phan_tram_giam_gia;

    return product;
  });
};

const mergeCurrentPriceAndAllProducts = async (
  allProducts,
  currentApplyPrices
) => {
  allProducts.map((product) => {
    const matchingAllProduct = currentApplyPrices[0].find(
      (currentApplyPrice) => currentApplyPrice.ma_mh === product.ma_mh
    );
    if (matchingAllProduct) {
      product.thay_doi_gia = {
        ...matchingAllProduct,
      };
      return product;
    }

    return product;
  });
  return allProducts;
};

const mergeAllAndPromotionProducts = async (allProducts, promotionProducts) => {
  return allProducts.map((product) => {
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
          product.thay_doi_gia.gia_dang_ap_dung *
          ((100 - matchingPromotionProduct.phan_tram_giam_gia) / 100),
      };
      return product;
    }

    return product;
  });
};

const mergeAllAndPromotionAndBestSellerProducts = async (
  allAndPromotionProducts,
  bestSellerProducts
) => {
  return allAndPromotionProducts.map((product) => {
    product.ten_loai_mh = product["loai_mat_hang.ten_loai_mh"];
    delete product["loai_mat_hang.ten_loai_mh"];
    const matchingAllPromotionProduct = bestSellerProducts[0].find(
      (bestSellerProduct) => bestSellerProduct.ma_mh === product.ma_mh
    );
    if (matchingAllPromotionProduct) {
      product.chi_tiet_da_ban = {
        tong_so_da_ban: matchingAllPromotionProduct.tong_so_da_ban,
      };
      return product;
    }

    return product;
  });
};

exports.resultMergedProducts = async (allProducts) => {
  const currentApplyPrices = await sequelizeManual.query(
    "SELECT * FROM view_gia_dang_ap_dung"
  );
  const promotionProducts = await sequelizeManual.query(
    "EXEC sp_lay_danh_sach_san_pham_dang_duoc_khuyen_mai"
  );
  const bestSellerProducts = await sequelizeManual.query(
    "EXEC sp_lay_danh_sach_mat_hang_cung_voi_tong_so_luong_da_ban"
  );

  const resultCurrentApplyPriceAndAllProducts =
    await mergeCurrentPriceAndAllProducts(allProducts, currentApplyPrices);

  const resultCurrentPriceAllAndPromotionProducts =
    await mergeAllAndPromotionProducts(
      resultCurrentApplyPriceAndAllProducts,
      promotionProducts
    );
  const resultProducts = await mergeAllAndPromotionAndBestSellerProducts(
    resultCurrentPriceAllAndPromotionProducts,
    bestSellerProducts
  );

  return resultProducts;
};

exports.searchProducts = async (allProducts, options) => {
  return allProducts.filter((product) => {
    let match = true;
    for (const key in options) {
      if (options[key] === undefined || options[key] === null) {
        continue;
      }
      const optionValue = options[key];
      const productValue = product[key];
      if (
        typeof productValue === "string" &&
        !productValue.toLowerCase().includes(optionValue.toLowerCase())
      ) {
        match = false;
        break;
      } else if (
        typeof productValue === "number" &&
        productValue !== Number(optionValue)
      ) {
        match = false;
        break;
      } else if (
        typeof productValue === "object" &&
        productValue !== null &&
        !productValue.ten_loai_mh
          .toLowerCase()
          .includes(optionValue.toLowerCase())
      ) {
        match = false;
        break;
      } else if (
        key === "gia_min" &&
        (product.khuyen_mai
          ? product.khuyen_mai.gia_sau_khi_giam
          : product.thay_doi_gia.gia_dang_ap_dung) < Number(optionValue)
      ) {
        match = false;
        break;
      } else if (
        key === "gia_max" &&
        (product.khuyen_mai
          ? product.khuyen_mai.gia_sau_khi_giam
          : product.thay_doi_gia.gia_dang_ap_dung) > Number(optionValue)
      ) {
        match = false;
        break;
      }
    }
    return match;
  });
};

// exports.searchProducts = async (allProducts, options) => {
//   return allProducts.filter((product) => {
//     let match = true;
//     for (const key in options) {
//       if (options[key] === undefined || options[key] === null) {
//         continue;
//       }
//       if (
//         typeof product[key] === "string" &&
//         !product[key].toLowerCase().includes(options[key].toLowerCase())
//       ) {
//         match = false;
//         break;
//       } else if (
//         typeof product[key] === "number" &&
//         product[key] !== options[key]
//       ) {
//         match = false;
//         break;
//       } else if (
//         typeof product[key] === "object" &&
//         product[key] !== null &&
//         !product[key].ten_loai_mh
//           .toLowerCase()
//           .includes(options[key].toLowerCase())
//       ) {
//         match = false;
//         break;
//       } else if (
//         key === "gia_min" &&
//         (product.khuyen_mai
//           ? product.khuyen_mai.gia_sau_khi_giam
//           : product.thay_doi_gia.gia_dang_ap_dung) < options.gia_min
//       ) {
//         match = false;
//         break;
//       } else if (
//         key === "gia_max" &&
//         (product.khuyen_mai
//           ? product.khuyen_mai.gia_sau_khi_giam
//           : product.thay_doi_gia.gia_dang_ap_dung) > options.gia_max
//       ) {
//         match = false;
//         break;
//       }
//     }
//     return match;
//   });
// };
