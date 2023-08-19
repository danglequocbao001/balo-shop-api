SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_lay_danh_sach_mat_hang_cung_voi_tong_so_luong_da_ban]
AS
BEGIN
    SELECT chi_tiet_don_dat_hang.ma_mh, SUM(chi_tiet_don_dat_hang.so_luong_dat) AS tong_so_da_ban
    FROM chi_tiet_don_dat_hang
        INNER JOIN don_dat_hang ON chi_tiet_don_dat_hang.ma_don_dat_hang = don_dat_hang.ma_don_dat_hang
    WHERE don_dat_hang.ma_trang_thai <> 'DA_HUY' AND don_dat_hang.ngay_tao >= DATEADD(day,-30,SWITCHOFFSET(GETDATE(), '+07:00'))
    GROUP BY chi_tiet_don_dat_hang.ma_mh
END
GO
