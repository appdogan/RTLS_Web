﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RTLS_Web
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class RTLSEntities : DbContext
    {
        public RTLSEntities()
            : base("name=RTLSEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<TBL_Bolgeler> TBL_Bolgeler { get; set; }
        public virtual DbSet<TBL_Departman> TBL_Departman { get; set; }
        public virtual DbSet<TBL_Firmalar> TBL_Firmalar { get; set; }
        public virtual DbSet<TBL_Gorev> TBL_Gorev { get; set; }
        public virtual DbSet<TBL_Rapor> TBL_Rapor { get; set; }
        public virtual DbSet<TBL_Ayarlar> TBL_Ayarlar { get; set; }
        public virtual DbSet<TBL_Personel> TBL_Personel { get; set; }
        public virtual DbSet<TBL_Haritalar> TBL_Haritalar { get; set; }
        public virtual DbSet<TBL_Map> TBL_Map { get; set; }
        public virtual DbSet<TBL_Gorevler> TBL_Gorevler { get; set; }
        public virtual DbSet<TBL_GorevlerPersonel> TBL_GorevlerPersonel { get; set; }
        public virtual DbSet<TBL_Aksiyon> TBL_Aksiyon { get; set; }
    }
}