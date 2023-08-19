SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_thong_ke_doanh_thu]
    @ngay_bat_dau DATE,
    @ngay_ket_thuc DATE
AS
BEGIN
    SELECT
        ddh.ngay_tao AS ngay,
        SUM(ctdh.so_luong_dat * ctdh.don_gia_dat) AS tong_thu
    FROM
        don_dat_hang ddh
        JOIN chi_tiet_don_dat_hang ctdh ON ddh.ma_don_dat_hang = ctdh.ma_don_dat_hang
    WHERE
        ddh.ngay_tao BETWEEN @ngay_bat_dau AND @ngay_ket_thuc AND ddh.ma_trang_thai IN ('DA_HOAN_THANH', 'CHO_DUYET', 'CHO_GIAO_HANG')
    GROUP BY
        ddh.ngay_tao;
END;
GO
