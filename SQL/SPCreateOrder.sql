SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_create_don_dat_hang]
    @ngay_tao date,
    @dia_chi_giao nvarchar(255),
    @ho_nguoi_nhan nvarchar(50),
    @ten_nguoi_nhan nvarchar(50),
    @sdt nvarchar(20),
    @ma_kh int,
    @ma_trang_thai varchar(20),
    @cac_mat_hang dbo.mat_hang_type READONLY
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;
        DECLARE @ma_don_dat_hang int;
        INSERT INTO don_dat_hang
        (ngay_tao, dia_chi_giao, ho_nguoi_nhan, ten_nguoi_nhan, sdt, ma_kh, ma_trang_thai)
    VALUES
        (@ngay_tao, @dia_chi_giao, @ho_nguoi_nhan, @ten_nguoi_nhan, @sdt, @ma_kh, @ma_trang_thai);
        SET @ma_don_dat_hang = SCOPE_IDENTITY();
        DECLARE @i int = 1;
        WHILE (@i <= (SELECT COUNT(*)
    FROM @cac_mat_hang))
        BEGIN
        DECLARE @ma_mh nvarchar(10) = (SELECT ma_mh
        FROM (SELECT ma_mh, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS RowNum
            FROM @cac_mat_hang) AS T
        WHERE RowNum = @i);
        DECLARE @so_luong_dat int = (SELECT so_luong_dat
        FROM (SELECT so_luong_dat, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS RowNum
            FROM @cac_mat_hang) AS T
        WHERE RowNum = @i);
        DECLARE @don_gia_dat money = (SELECT don_gia_dat
        FROM (SELECT don_gia_dat, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS RowNum
            FROM @cac_mat_hang) AS T
        WHERE RowNum = @i);

        INSERT INTO chi_tiet_don_dat_hang
            (ma_mh, ma_don_dat_hang, so_luong_dat, don_gia_dat)
        VALUES
            (@ma_mh, @ma_don_dat_hang, @so_luong_dat, @don_gia_dat);
        -- UPDATE mat_hang SET so_luong = so_luong - @so_luong_dat WHERE ma_mh = @ma_mh;
        SET @i += 1;
    END
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
