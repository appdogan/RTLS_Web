
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/06/2018 11:54:33
-- Generated from EDMX file: E:\Projeler\RTLS_Web\RTLS_Web\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [RTLS];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[TBL_Ayarlar]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Ayarlar];
GO
IF OBJECT_ID(N'[dbo].[TBL_Bolgeler]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Bolgeler];
GO
IF OBJECT_ID(N'[dbo].[TBL_Departman]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Departman];
GO
IF OBJECT_ID(N'[dbo].[TBL_Firmalar]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Firmalar];
GO
IF OBJECT_ID(N'[dbo].[TBL_Gorev]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Gorev];
GO
IF OBJECT_ID(N'[dbo].[TBL_Gorevler]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Gorevler];
GO
IF OBJECT_ID(N'[dbo].[TBL_GorevlerPersonel]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_GorevlerPersonel];
GO
IF OBJECT_ID(N'[dbo].[TBL_Haritalar]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Haritalar];
GO
IF OBJECT_ID(N'[dbo].[TBL_Map]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Map];
GO
IF OBJECT_ID(N'[dbo].[TBL_Personel]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Personel];
GO
IF OBJECT_ID(N'[dbo].[TBL_Rapor]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TBL_Rapor];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'TBL_Bolgeler'
CREATE TABLE [dbo].[TBL_Bolgeler] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Harita_ID] int  NULL,
    [BolgeAdi] nvarchar(200)  NULL,
    [Anchor1_X] int  NULL,
    [Anchor1_Y] int  NULL,
    [Anchor1_Z] int  NULL,
    [Anchor2_X] int  NULL,
    [Anchor2_Y] int  NULL,
    [Anchor2_Z] int  NULL,
    [Anchor3_X] int  NULL,
    [Anchor3_Y] int  NULL,
    [Anchor3_Z] int  NULL,
    [AnchorMaster_X] int  NULL,
    [AnchorMaster_Y] int  NULL,
    [AnchorMaster_Z] int  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL,
    [Anchor1_ID] int  NULL,
    [Anchor2_ID] int  NULL,
    [Anchor3_ID] int  NULL,
    [AnchorMaster_ID] int  NULL,
    [Anchor1_Ip] nvarchar(15)  NULL,
    [Anchor2_Ip] nvarchar(15)  NULL,
    [Anchor3_Ip] nvarchar(15)  NULL,
    [AnchorMaster_Ip] nvarchar(15)  NULL
);
GO

-- Creating table 'TBL_Departman'
CREATE TABLE [dbo].[TBL_Departman] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Departman] nvarchar(250)  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL
);
GO

-- Creating table 'TBL_Firmalar'
CREATE TABLE [dbo].[TBL_Firmalar] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Firma] nvarchar(100)  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL
);
GO

-- Creating table 'TBL_Gorev'
CREATE TABLE [dbo].[TBL_Gorev] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Departman_ID] int  NULL,
    [Gorev] nvarchar(250)  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL
);
GO

-- Creating table 'TBL_Rapor'
CREATE TABLE [dbo].[TBL_Rapor] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Tag] nvarchar(50)  NULL,
    [Tarih] datetime  NULL,
    [PersonelID] int  NULL,
    [HaritaID] int  NULL,
    [BolgeID] int  NULL,
    [ToplamZaman] int  NULL,
    [SonOkuma] datetime  NULL,
    [dlt] int  NULL
);
GO

-- Creating table 'TBL_Ayarlar'
CREATE TABLE [dbo].[TBL_Ayarlar] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Com] nvarchar(10)  NULL,
    [BaglantiHizi] int  NULL,
    [YetkiliMailleri] nvarchar(max)  NULL,
    [AcilDurumMailSablonu] nvarchar(max)  NULL,
    [AlarmMailGonder] int  NULL,
    [Port] nvarchar(50)  NULL,
    [HaberlesmeTuru] int  NULL,
    [Tolerans] int  NULL,
    [Oran] float  NULL
);
GO

-- Creating table 'TBL_Personel'
CREATE TABLE [dbo].[TBL_Personel] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Ad] nvarchar(50)  NULL,
    [Soyad] nvarchar(50)  NULL,
    [Departman_ID] int  NULL,
    [Gorev_ID] int  NULL,
    [TagNo] nvarchar(15)  NULL,
    [Aciklama] nvarchar(max)  NULL,
    [KamraIp] nvarchar(50)  NULL,
    [Firma_ID] int  NULL,
    [TagTipi] nvarchar(50)  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL,
    [RFID_Tag] nvarchar(100)  NULL,
    [OdaNo] int  NULL,
    [OdaIslem] int  NULL,
    [OdaIslemTarih] datetime  NULL
);
GO

-- Creating table 'TBL_Haritalar'
CREATE TABLE [dbo].[TBL_Haritalar] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Map_ID] int  NULL,
    [HaritaAdi] nvarchar(250)  NULL,
    [Aciklama] nvarchar(max)  NULL,
    [Resim_w] int  NULL,
    [Resim_h] int  NULL,
    [Harita_w] int  NULL,
    [Harita_h] int  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL,
    [Oran] int  NULL
);
GO

-- Creating table 'TBL_Map'
CREATE TABLE [dbo].[TBL_Map] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Map] nvarchar(250)  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL
);
GO

-- Creating table 'TBL_Gorevler'
CREATE TABLE [dbo].[TBL_Gorevler] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [GorevBasligi] nvarchar(400)  NULL,
    [Aciklama] nvarchar(max)  NULL,
    [BaslangicTarihi] datetime  NULL,
    [BitisTarihi] datetime  NULL,
    [Personel_ID] int  NULL,
    [Durum] int  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL
);
GO

-- Creating table 'TBL_GorevlerPersonel'
CREATE TABLE [dbo].[TBL_GorevlerPersonel] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Gorev_ID] int  NULL,
    [Personel_ID] int  NULL,
    [Zaman] datetime  NULL,
    [Aciklama] nvarchar(max)  NULL,
    [Durum] int  NULL,
    [dlt] int  NULL,
    [dlt_Zaman] datetime  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [ID] in table 'TBL_Bolgeler'
ALTER TABLE [dbo].[TBL_Bolgeler]
ADD CONSTRAINT [PK_TBL_Bolgeler]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Departman'
ALTER TABLE [dbo].[TBL_Departman]
ADD CONSTRAINT [PK_TBL_Departman]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Firmalar'
ALTER TABLE [dbo].[TBL_Firmalar]
ADD CONSTRAINT [PK_TBL_Firmalar]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Gorev'
ALTER TABLE [dbo].[TBL_Gorev]
ADD CONSTRAINT [PK_TBL_Gorev]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Rapor'
ALTER TABLE [dbo].[TBL_Rapor]
ADD CONSTRAINT [PK_TBL_Rapor]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Ayarlar'
ALTER TABLE [dbo].[TBL_Ayarlar]
ADD CONSTRAINT [PK_TBL_Ayarlar]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Personel'
ALTER TABLE [dbo].[TBL_Personel]
ADD CONSTRAINT [PK_TBL_Personel]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Haritalar'
ALTER TABLE [dbo].[TBL_Haritalar]
ADD CONSTRAINT [PK_TBL_Haritalar]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Map'
ALTER TABLE [dbo].[TBL_Map]
ADD CONSTRAINT [PK_TBL_Map]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_Gorevler'
ALTER TABLE [dbo].[TBL_Gorevler]
ADD CONSTRAINT [PK_TBL_Gorevler]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'TBL_GorevlerPersonel'
ALTER TABLE [dbo].[TBL_GorevlerPersonel]
ADD CONSTRAINT [PK_TBL_GorevlerPersonel]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------