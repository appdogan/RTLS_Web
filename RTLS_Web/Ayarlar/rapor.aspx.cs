using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class rapor : System.Web.UI.Page
    {
        public int sn(string saat)
        {
            string[] zaman = saat.Split(':');
            return ((Convert.ToInt32(zaman[0]) * 60) * 60) + (Convert.ToInt32(zaman[1]) * 60) + Convert.ToInt32(zaman[2]);
        }
        public string snZaman(int sn)
        {
            int girdi = sn;

            int yil = 0;
            int ay = 0;
            int gun = 0;
            int saat = 0;
            int dakika = 0;

            yil = girdi / 31104000;
            girdi = girdi - yil * 3110400;

            ay = girdi / 2592000;
            girdi = girdi - ay * 2592000;

            gun = girdi / 86400;
            girdi = girdi - gun * 86400;

            saat = girdi / 3600;
            girdi = girdi - saat * 3600;

            dakika = girdi / 60;
            girdi = girdi - dakika * 60;

            return Cift(saat) + ":" + Cift(dakika) + ":" + Cift(girdi);
            //int yil = 0;
            //int ay = 0;
            //int gun = 0;
            //int saat = 0;
            //int dakika = 0;

            //yil = sn / 31104000;
            //sn = sn - yil * 3110400;

            //ay = sn / 2592000;
            //sn = sn - ay * 2592000;

            //gun = sn / 86400;
            //sn = sn - gun * 86400;

            //saat = sn / 3600;
            //sn = sn - saat * 3600;

            //dakika = sn / 60;
            //sn = sn - dakika * 60;

            //string sure = "";
            //if (yil > 0)
            //{
            //    sure = yil + " Y ";
            //}
            //else
            //{
            //    if (ay > 0)
            //    {
            //        sure += ay + " M ";
            //    }
            //    else
            //    {
            //        if (gun > 0)
            //        {
            //            sure += gun + " D ";
            //        }
            //        else
            //        {
            //            if (saat > 0)
            //            {
            //                sure += saat + ":";
            //            }
            //            else
            //            {
            //                sure += "00:";
            //                if (dakika > 0)
            //                {
            //                    sure += dakika + ":";
            //                }
            //            }
            //        }
            //    }
            //}

            //return sure + sn;
        }
        RTLSEntities ctx = new RTLSEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Firma_ID.DataSource = ctx.TBL_Firmalar.Where(x => x.dlt == 0).ToList();

                Firma_ID.DataTextField = "Firma";
                Firma_ID.DataValueField = "ID";
                Firma_ID.DataBind();

                Firma_ID.Items.Insert(0, new ListItem("-- Tüm Firmalar --", "0"));

                tarih1.Text = DateTime.Today.ToString("yyyy-MM-dd");
                tarih2.Text = DateTime.Today.ToString("yyyy-MM-dd");
            }
            listele();
        }
        public void listele()
        {
            try
            {
                int FirmaID = Convert.ToInt32(Firma_ID.SelectedValue);

                DateTime t1 = Convert.ToDateTime(tarih1.Text);
                DateTime t2 = Convert.ToDateTime(tarih2.Text);

                var sorgu = (from r in ctx.TBL_Rapor
                             join p in ctx.TBL_Personel
                             on r.PersonelID equals p.ID
                             join h in ctx.TBL_Haritalar
                             on r.HaritaID equals h.ID
                             join f in ctx.TBL_Firmalar
                             on p.Firma_ID equals f.ID
                             join d in ctx.TBL_Departman
                             on p.Departman_ID equals d.ID
                             join g in ctx.TBL_Gorev
                             on p.Gorev_ID equals g.ID

                             where r.dlt == 0 && r.Tarih >= t1 && r.Tarih <= t2

                             select new
                             {
                                 p.Firma_ID,
                                 p.TagNo,
                                 r.Tarih,
                                 f.Firma,
                                 Personel = p.Ad + " " + p.Soyad,
                                 d.Departman,
                                 g.Gorev,
                                 Konum = h.HaritaAdi,
                                 r.ToplamZaman,
                                 personelID = p.ID,
                                 haritaID = h.ID
                             });
                if (FirmaID != 0)
                {
                    sorgu = sorgu.Where(x => x.Firma_ID == FirmaID);
                }
                RList.DataSource = sorgu.ToList();
                RList.DataBind();
            }
            catch
            {

            }
        }
        public string Cift(int t)
        {
            if (t < 10)
            {
                return "0" + t;
            }
            else
            {
                return t.ToString();
            }
        }
    }
}