SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_thong_ke_doanh_thu_while]
    @ngay_bat_dau DATE,
    @ngay_ket_thuc DATE
AS
BEGIN
    DECLARE @date DATE = @ngay_bat_dau;
    CREATE TABLE #temp (ngay DATE, tong_thu FLOAT);
    WHILE (@date <= @ngay_ket_thuc)
    BEGIN
        INSERT INTO #temp (ngay, tong_thu)
        SELECT @date AS ngay, SUM(chi_tiet_don_dat_hang.so_luong_dat * chi_tiet_don_dat_hang.don_gia_dat) AS tong_thu
        FROM don_dat_hang
        LEFT JOIN chi_tiet_don_dat_hang ON don_dat_hang.ma_don_dat_hang = chi_tiet_don_dat_hang.ma_don_dat_hang
        WHERE CONVERT(DATE, don_dat_hang.ngay_tao) = @date AND don_dat_hang.ma_trang_thai IN ('CHO_DUYET', 'CHO_GIAO_HANG', 'DA_HOAN_THANH');
        SET @date = DATEADD(day, 1, @date);
    END;
    SELECT ngay, ISNULL(tong_thu, 0) AS tong_thu FROM #temp ORDER BY ngay;
END;
GO
