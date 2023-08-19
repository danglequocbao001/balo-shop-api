SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[thong_ke_doanh_thu_theo_thang]
    @thang DATE
AS
BEGIN
    SELECT
        DATEFROMPARTS(YEAR(ddh.ngay_tao), MONTH(ddh.ngay_tao), 1) AS thang,
        SUM(ctdh.so_luong_dat * ctdh.don_gia_dat) AS tong_thu
    FROM
        don_dat_hang ddh
        JOIN chi_tiet_don_dat_hang ctdh ON ddh.ma_don_dat_hang = ctdh.ma_don_dat_hang
    WHERE
        YEAR(ddh.ngay_tao) = YEAR(@thang) AND MONTH(ddh.ngay_tao) = MONTH(@thang) AND ddh.ma_trang_thai IN ('DA_HOAN_THANH', 'CHO_DUYET', 'CHO_GIAO_HANG')
    GROUP BY
        DATEFROMPARTS(YEAR(ddh.ngay_tao), MONTH(ddh.ngay_tao), 1);
END;
GO
