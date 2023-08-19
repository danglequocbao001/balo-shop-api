USE [master]
GO
/****** Object:  Database [BALO_SHOP]    Script Date: 19-Aug-23 14:35:00 ******/
CREATE DATABASE [BALO_SHOP]

ALTER DATABASE [BALO_SHOP] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BALO_SHOP].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BALO_SHOP] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BALO_SHOP] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BALO_SHOP] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BALO_SHOP] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BALO_SHOP] SET ARITHABORT OFF 
GO
ALTER DATABASE [BALO_SHOP] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BALO_SHOP] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BALO_SHOP] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BALO_SHOP] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BALO_SHOP] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BALO_SHOP] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BALO_SHOP] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BALO_SHOP] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BALO_SHOP] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BALO_SHOP] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BALO_SHOP] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BALO_SHOP] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BALO_SHOP] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BALO_SHOP] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BALO_SHOP] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BALO_SHOP] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BALO_SHOP] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BALO_SHOP] SET RECOVERY FULL 
GO
ALTER DATABASE [BALO_SHOP] SET  MULTI_USER 
GO
ALTER DATABASE [BALO_SHOP] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BALO_SHOP] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BALO_SHOP] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BALO_SHOP] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [BALO_SHOP] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'BALO_SHOP', N'ON'
GO
USE [BALO_SHOP]
GO
/****** Object:  Table [dbo].[binh_luan]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[binh_luan](
	[ma_binh_luan] [int] IDENTITY(1,1) NOT NULL,
	[ma_kh] [int] NULL,
	[ma_mh] [varchar](20) NULL,
	[noi_dung] [nvarchar](max) NOT NULL,
	[diem_danh_gia] [varchar](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_binh_luan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bo_phan]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bo_phan](
	[ma_bp] [varchar](20) NOT NULL,
	[ten_bp] [nvarchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_bp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bophan_nhanvien]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bophan_nhanvien](
	[ma_bp] [varchar](20) NOT NULL,
	[ma_nv] [varchar](20) NOT NULL,
	[ngay_dieu_chuyen] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_bp] ASC,
	[ma_nv] ASC,
	[ngay_dieu_chuyen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_bao_hanh]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_bao_hanh](
	[ma_phieu_bao_hanh] [int] NOT NULL,
	[ma_nv_nhan] [varchar](20) NOT NULL,
	[ngay_nhan] [date] NOT NULL,
	[tinh_trang_truoc] [nvarchar](max) NOT NULL,
	[tinh_trang_sau] [nvarchar](max) NOT NULL,
	[ma_nv_giao] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_bao_hanh] ASC,
	[ma_nv_nhan] ASC,
	[ngay_nhan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_don_dat_hang]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_don_dat_hang](
	[ma_ctdh] [int] IDENTITY(1,1) NOT NULL,
	[ma_mh] [varchar](20) NOT NULL,
	[ma_don_dat_hang] [int] NOT NULL,
	[ma_phieu_tra] [int] NULL,
	[so_luong_tra] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_mh] ASC,
	[ma_don_dat_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ma_ctdh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_khuyen_mai]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_khuyen_mai](
	[ma_km] [varchar](20) NOT NULL,
	[ma_mh] [varchar](20) NOT NULL,
	[phan_tram_giam_gia] [varchar](3) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_km] ASC,
	[ma_mh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_phieu_dat]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_phieu_dat](
	[ma_phieu_dat] [int] NOT NULL,
	[ma_mh] [varchar](20) NOT NULL,
	[so_luong] [varchar](max) NOT NULL,
	[don_gia] [decimal](19, 4) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_dat] ASC,
	[ma_mh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_phieu_nhap]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_phieu_nhap](
	[ma_phieu_nhap] [int] NOT NULL,
	[ma_mh] [varchar](20) NOT NULL,
	[gia_nhap] [decimal](19, 4) NOT NULL,
	[so_luong] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_nhap] ASC,
	[ma_mh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cung_cap]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cung_cap](
	[ma_ncc] [varchar](20) NOT NULL,
	[ma_loai_mh] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_ncc] ASC,
	[ma_loai_mh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[don_dat_hang]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[don_dat_hang](
	[ma_don_dat_hang] [int] IDENTITY(1,1) NOT NULL,
	[ngay_tao] [date] NOT NULL,
	[dia_chi_giao] [nvarchar](200) NOT NULL,
	[thoi_gian_giao] [date] NOT NULL,
	[ho_nguoi_nhan] [nvarchar](50) NOT NULL,
	[ten_nguoi_nhan] [nvarchar](25) NOT NULL,
	[sdt] [varchar](11) NOT NULL,
	[ma_kh] [int] NULL,
	[ma_trang_thai] [varchar](20) NULL,
	[ma_nv_duyet] [varchar](20) NULL,
	[ma_nv_giao_hang] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_don_dat_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hoa_don]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hoa_don](
	[ma_hoa_don] [varchar](20) NOT NULL,
	[ngay_lap] [date] NOT NULL,
	[hoa_don_do] [bit] NULL,
	[mst] [varchar](13) NULL,
	[ho_mst] [nvarchar](50) NULL,
	[ten_mst] [nvarchar](25) NULL,
	[ma_nv] [varchar](20) NULL,
	[ma_don_dat_hang] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_hoa_don] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ma_don_dat_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[khach_hang]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[khach_hang](
	[ma_kh] [int] IDENTITY(1,1) NOT NULL,
	[email_kh] [varchar](30) NOT NULL,
	[ho_kh] [nvarchar](50) NOT NULL,
	[ten_kh] [nvarchar](25) NOT NULL,
	[dia_chi] [nvarchar](200) NOT NULL,
	[sdt] [varchar](11) NOT NULL,
	[so_id] [varchar](12) NULL,
	[mat_khau] [varchar](20) NOT NULL,
	[dang_hoat_dong] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_kh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email_kh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[khuyen_mai]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[khuyen_mai](
	[ma_km] [varchar](20) NOT NULL,
	[ten_km] [nvarchar](200) NOT NULL,
	[ngay_bd] [date] NOT NULL,
	[ngay_kt] [date] NOT NULL,
	[mo_ta] [nvarchar](max) NOT NULL,
	[ma_nv] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_km] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[loai_mat_hang]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[loai_mat_hang](
	[ma_loai_mh] [varchar](20) NOT NULL,
	[ten_loai_mh] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_loai_mh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mat_hang]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mat_hang](
	[ma_mh] [varchar](20) NOT NULL,
	[ten_mh] [nvarchar](100) NOT NULL,
	[nha_san_xuat] [nvarchar](100) NOT NULL,
	[so_luong] [varchar](max) NOT NULL,
	[gia] [int] NOT NULL,
	[hinh_anh] [nvarchar](max) NOT NULL,
	[mo_ta] [nvarchar](max) NOT NULL,
	[is_new] [bit] NOT NULL,
	[ma_loai_mh] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_mh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ten_mh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nha_cung_cap]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nha_cung_cap](
	[ma_ncc] [varchar](20) NOT NULL,
	[ten_ncc] [nvarchar](100) NOT NULL,
	[dia_chi] [nvarchar](200) NOT NULL,
	[sdt] [varchar](11) NOT NULL,
	[email_ncc] [varchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_ncc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email_ncc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nhan_vien]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nhan_vien](
	[ma_nv] [varchar](20) NOT NULL,
	[email_nv] [varchar](30) NOT NULL,
	[ho_nv] [nvarchar](50) NOT NULL,
	[ten_nv] [nvarchar](25) NOT NULL,
	[ngay_sinh] [date] NULL,
	[dia_chi] [nvarchar](200) NULL,
	[luong] [money] NOT NULL,
	[mat_khau] [varchar](20) NOT NULL,
	[dang_hoat_dong] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_nv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email_nv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phieu_bao_hanh]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phieu_bao_hanh](
	[ma_phieu_bao_hanh] [int] IDENTITY(1,1) NOT NULL,
	[ngay_bat_dau] [date] NOT NULL,
	[so_thang_bao_hanh] [varchar](12) NOT NULL,
	[ma_nv] [varchar](20) NULL,
	[ma_mh] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_bao_hanh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phieu_dat]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phieu_dat](
	[ma_phieu_dat] [int] IDENTITY(1,1) NOT NULL,
	[ngay_dat] [date] NOT NULL,
	[ma_nv] [varchar](20) NULL,
	[ma_ncc] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_dat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phieu_nhap]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phieu_nhap](
	[ma_phieu_nhap] [int] IDENTITY(1,1) NOT NULL,
	[ngay_nhap] [date] NOT NULL,
	[ma_nv] [varchar](20) NULL,
	[ma_phieu_dat] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_nhap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phieu_tra]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phieu_tra](
	[ma_phieu_tra] [int] IDENTITY(1,1) NOT NULL,
	[ngay_lap] [date] NOT NULL,
	[ma_nv] [varchar](20) NULL,
	[ma_hoa_don] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_tra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ma_hoa_don] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[quang_cao]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[quang_cao](
	[ma_qc] [int] IDENTITY(1,1) NOT NULL,
	[ten_qc] [nvarchar](100) NOT NULL,
	[ngay_tao] [date] NOT NULL,
	[noi_dung] [nvarchar](max) NOT NULL,
	[hinh_anh] [nvarchar](max) NOT NULL,
	[ma_nv] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_qc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[thay_doi_gia]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[thay_doi_gia](
	[ma_nv] [varchar](20) NOT NULL,
	[ma_mh] [varchar](20) NOT NULL,
	[ngay_cap_nhat] [date] NOT NULL,
	[gia_moi] [decimal](19, 4) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_nv] ASC,
	[ma_mh] ASC,
	[ngay_cap_nhat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trang_thai_don_dat_hang]    Script Date: 19-Aug-23 14:35:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trang_thai_don_dat_hang](
	[ma_trang_thai] [varchar](20) NOT NULL,
	[ten_trang_thai] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_trang_thai] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[hoa_don] ADD  DEFAULT ((0)) FOR [hoa_don_do]
GO
ALTER TABLE [dbo].[khach_hang] ADD  DEFAULT ((1)) FOR [dang_hoat_dong]
GO
ALTER TABLE [dbo].[mat_hang] ADD  DEFAULT ((0)) FOR [is_new]
GO
ALTER TABLE [dbo].[nhan_vien] ADD  DEFAULT ((1)) FOR [dang_hoat_dong]
GO
ALTER TABLE [dbo].[binh_luan]  WITH CHECK ADD FOREIGN KEY([ma_kh])
REFERENCES [dbo].[khach_hang] ([ma_kh])
GO
ALTER TABLE [dbo].[binh_luan]  WITH CHECK ADD FOREIGN KEY([ma_mh])
REFERENCES [dbo].[mat_hang] ([ma_mh])
GO
ALTER TABLE [dbo].[bophan_nhanvien]  WITH CHECK ADD FOREIGN KEY([ma_bp])
REFERENCES [dbo].[bo_phan] ([ma_bp])
GO
ALTER TABLE [dbo].[bophan_nhanvien]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[chi_tiet_bao_hanh]  WITH CHECK ADD FOREIGN KEY([ma_nv_nhan])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[chi_tiet_bao_hanh]  WITH CHECK ADD FOREIGN KEY([ma_nv_giao])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[chi_tiet_bao_hanh]  WITH CHECK ADD FOREIGN KEY([ma_phieu_bao_hanh])
REFERENCES [dbo].[phieu_bao_hanh] ([ma_phieu_bao_hanh])
GO
ALTER TABLE [dbo].[chi_tiet_don_dat_hang]  WITH CHECK ADD FOREIGN KEY([ma_don_dat_hang])
REFERENCES [dbo].[don_dat_hang] ([ma_don_dat_hang])
GO
ALTER TABLE [dbo].[chi_tiet_don_dat_hang]  WITH CHECK ADD FOREIGN KEY([ma_mh])
REFERENCES [dbo].[mat_hang] ([ma_mh])
GO
ALTER TABLE [dbo].[chi_tiet_don_dat_hang]  WITH CHECK ADD FOREIGN KEY([ma_phieu_tra])
REFERENCES [dbo].[phieu_tra] ([ma_phieu_tra])
GO
ALTER TABLE [dbo].[chi_tiet_khuyen_mai]  WITH CHECK ADD FOREIGN KEY([ma_km])
REFERENCES [dbo].[khuyen_mai] ([ma_km])
GO
ALTER TABLE [dbo].[chi_tiet_khuyen_mai]  WITH CHECK ADD FOREIGN KEY([ma_mh])
REFERENCES [dbo].[mat_hang] ([ma_mh])
GO
ALTER TABLE [dbo].[chi_tiet_phieu_dat]  WITH CHECK ADD FOREIGN KEY([ma_mh])
REFERENCES [dbo].[mat_hang] ([ma_mh])
GO
ALTER TABLE [dbo].[chi_tiet_phieu_dat]  WITH CHECK ADD FOREIGN KEY([ma_phieu_dat])
REFERENCES [dbo].[phieu_dat] ([ma_phieu_dat])
GO
ALTER TABLE [dbo].[chi_tiet_phieu_nhap]  WITH CHECK ADD FOREIGN KEY([ma_mh])
REFERENCES [dbo].[mat_hang] ([ma_mh])
GO
ALTER TABLE [dbo].[chi_tiet_phieu_nhap]  WITH CHECK ADD FOREIGN KEY([ma_phieu_nhap])
REFERENCES [dbo].[phieu_nhap] ([ma_phieu_nhap])
GO
ALTER TABLE [dbo].[cung_cap]  WITH CHECK ADD FOREIGN KEY([ma_loai_mh])
REFERENCES [dbo].[loai_mat_hang] ([ma_loai_mh])
GO
ALTER TABLE [dbo].[cung_cap]  WITH CHECK ADD FOREIGN KEY([ma_ncc])
REFERENCES [dbo].[nha_cung_cap] ([ma_ncc])
GO
ALTER TABLE [dbo].[don_dat_hang]  WITH CHECK ADD FOREIGN KEY([ma_kh])
REFERENCES [dbo].[khach_hang] ([ma_kh])
GO
ALTER TABLE [dbo].[don_dat_hang]  WITH CHECK ADD FOREIGN KEY([ma_nv_duyet])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[don_dat_hang]  WITH CHECK ADD FOREIGN KEY([ma_nv_giao_hang])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[don_dat_hang]  WITH CHECK ADD FOREIGN KEY([ma_trang_thai])
REFERENCES [dbo].[trang_thai_don_dat_hang] ([ma_trang_thai])
GO
ALTER TABLE [dbo].[hoa_don]  WITH CHECK ADD  CONSTRAINT [FK__hoa_don__ma_don___3C69FB99] FOREIGN KEY([ma_don_dat_hang])
REFERENCES [dbo].[don_dat_hang] ([ma_don_dat_hang])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[hoa_don] CHECK CONSTRAINT [FK__hoa_don__ma_don___3C69FB99]
GO
ALTER TABLE [dbo].[hoa_don]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[khuyen_mai]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[mat_hang]  WITH CHECK ADD FOREIGN KEY([ma_loai_mh])
REFERENCES [dbo].[loai_mat_hang] ([ma_loai_mh])
GO
ALTER TABLE [dbo].[phieu_bao_hanh]  WITH CHECK ADD FOREIGN KEY([ma_mh])
REFERENCES [dbo].[mat_hang] ([ma_mh])
GO
ALTER TABLE [dbo].[phieu_bao_hanh]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[phieu_dat]  WITH CHECK ADD FOREIGN KEY([ma_ncc])
REFERENCES [dbo].[nha_cung_cap] ([ma_ncc])
GO
ALTER TABLE [dbo].[phieu_dat]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[phieu_nhap]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[phieu_nhap]  WITH CHECK ADD FOREIGN KEY([ma_phieu_dat])
REFERENCES [dbo].[phieu_dat] ([ma_phieu_dat])
GO
ALTER TABLE [dbo].[phieu_tra]  WITH CHECK ADD  CONSTRAINT [FK__phieu_tra__ma_ho__412EB0B6] FOREIGN KEY([ma_hoa_don])
REFERENCES [dbo].[hoa_don] ([ma_hoa_don])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[phieu_tra] CHECK CONSTRAINT [FK__phieu_tra__ma_ho__412EB0B6]
GO
ALTER TABLE [dbo].[phieu_tra]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[quang_cao]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
ALTER TABLE [dbo].[thay_doi_gia]  WITH CHECK ADD FOREIGN KEY([ma_mh])
REFERENCES [dbo].[mat_hang] ([ma_mh])
GO
ALTER TABLE [dbo].[thay_doi_gia]  WITH CHECK ADD FOREIGN KEY([ma_nv])
REFERENCES [dbo].[nhan_vien] ([ma_nv])
GO
USE [master]
GO
ALTER DATABASE [BALO_SHOP] SET  READ_WRITE 
GO
