SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_lay_danh_sach_san_pham_dang_duoc_khuyen_mai]
AS
BEGIN
    SELECT mh.ma_mh, km.ma_km, km.ngay_bd, km.ngay_kt, ctkm.phan_tram_giam_gia, lmh.ten_loai_mh
    FROM khuyen_mai km
        JOIN chi_tiet_khuyen_mai ctkm ON km.ma_km = ctkm.ma_km
        JOIN mat_hang mh ON ctkm.ma_mh = mh.ma_mh
        JOIN loai_mat_hang lmh ON mh.ma_loai_mh = lmh.ma_loai_mh
    WHERE SWITCHOFFSET(GETDATE(), '+07:00') BETWEEN km.ngay_bd AND km.ngay_kt
    ORDER BY ctkm.phan_tram_giam_gia DESC;
END
GO
