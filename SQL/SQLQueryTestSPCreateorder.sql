DECLARE @cac_mat_hang dbo.mat_hang_type;
INSERT INTO @cac_mat_hang (ma_mh, so_luong_dat, don_gia_dat)
VALUES ('BLDL2', 1, 170000), ('BLDL1', 1, 90000);

EXEC sp_create_don_dat_hang '2023-07-25', '97 Man Thiện, Phường Hiệp Phú, Thành phố Thủ Đức, Sài Gòn', 'Đặng', 'Bảo', '0359999999', 1, "CHO_THANH_TOAN", @cac_mat_hang;