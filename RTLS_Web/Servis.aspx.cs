using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Net;
using System.IO;
using System.Text.RegularExpressions;
using System.Net.NetworkInformation;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;

namespace RTLS_Web
{
    public partial class Servis : System.Web.UI.Page
    {
        public class Anchor
        {
            public string Anchor1_X { get; set; }
            public string Anchor1_Y { get; set; }
            public string Anchor1_Z { get; set; }

            public string Anchor2_X { get; set; }
            public string Anchor2_Y { get; set; }
            public string Anchor2_Z { get; set; }

            public string Anchor3_X { get; set; }
            public string Anchor3_Y { get; set; }
            public string Anchor3_Z { get; set; }

            public string AnchorMaster_X { get; set; }
            public string AnchorMaster_Y { get; set; }
            public string AnchorMaster_Z { get; set; }
        }
        public class Durum
        {
            public int durum { get; set; }
            public string hata { get; set; }
        }
        public class Gorev
        {
            public int ID { get; set; }
            public string GorevBasligi { get; set; }
            public DateTime BaslangicTarihi { get; set; }
            public DateTime BitisTarihi { get; set; }
            public int Personel_ID { get; set; }
            public int Durum { get; set; }
            public string Aciklama { get; set; }
        }
        Anchor anchor = new Anchor();
        string json = "";

        RTLSEntities ctx = new RTLSEntities();
        public DateTime TarihKontrol(string tarih)
        {
            if (tarih == "")
            {
                return Convert.ToDateTime("01.01.1900");
            }
            else
            {
                return Convert.ToDateTime(tarih);
            }
        }
       
        public string IP()
        {
            if (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            }
            else if (HttpContext.Current.Request.UserHostAddress.Length != 0)
            {
                return HttpContext.Current.Request.UserHostAddress;
            }
            else
            {
                return "";
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            bool yetki = false;
            string[] ipler = ("" +
                "127.0.0.1," +
                "192.168.1.40," +
                "192.168.10.40," +
                "192.168.1.86," +
                "192.168.10.80," +
                "192.168.10.86," +
                "192.168.10.45," +
                "192.168.10.33," +
                "192.168.10.150," +
                "::1").Split(',');

            for (int i = 0; i < ipler.Length; i++)
            {
                if (ipler[i] == IP())
                {
                    yetki = true;
                    break;
                }
            }
            yetki = true;
            if (yetki == true)
            {
                string servis = Request.QueryString["Servis"];

                if (servis == "AnchorKonum")
                {
                    var bolgeler = ctx.TBL_Bolgeler.Where(x => x.dlt == 0).ToList();
                    json = JsonConvert.SerializeObject(bolgeler);
                    Response.Write(json);
                }
                else if (servis == "personelKonum")
                {
                    int A1 = Convert.ToInt32(Request.QueryString["A1"]);
                    var k = from m in ctx.TBL_Map
                            join h in ctx.TBL_Haritalar
                            on m.ID equals h.Map_ID
                            join b in ctx.TBL_Bolgeler
                            on h.ID equals b.Harita_ID
                            where h.dlt == 0 && m.dlt == 0 && b.dlt == 0 && b.Anchor1_ID == A1
                            select new
                            {
                                m.Map,
                                Map_ID = m.ID,
                                b.BolgeAdi,
                                Bolge_ID = b.ID,
                                h.HaritaAdi,
                                Harita_ID = h.ID
                            };
                    //ctx.TBL_Bolgeler.SingleOrDefault(x=>x.dlt==0 && x.Anchor1_ID==A1);
                    json = JsonConvert.SerializeObject(k);
                    Response.Write(json);
                }
                else if (servis == "PersonelList")
                {
                    var personel = from p in ctx.TBL_Personel
                                   join f in ctx.TBL_Firmalar
                                   on p.Firma_ID equals f.ID
                                   join g in ctx.TBL_Gorev
                                   on p.Gorev_ID equals g.ID
                                   join d in ctx.TBL_Departman
                                   on p.Departman_ID equals d.ID
                                   where p.dlt == 0
                                   select new
                                   {
                                       p.ID,
                                       p.Ad,
                                       p.Soyad,
                                       p.TagNo,
                                       f.Firma,
                                       d.Departman,
                                       g.Gorev,
                                       p.KamraIp,
                                       p.TagTipi,
                                       p.Firma_ID
                                   };
                    json = JsonConvert.SerializeObject(personel.ToList());
                    Response.Write(json);
                }
                else if (servis == "Firmalar")
                {
                    var firmalar = from f in ctx.TBL_Firmalar
                                   where f.dlt == 0
                                   orderby f.Firma
                                   select new
                                   {
                                       f.ID,
                                       f.Firma,
                                       Adet = ctx.TBL_Personel.Where(x => x.dlt == 0 && x.Firma_ID == f.ID).Count()
                                   };
                    //ctx.TBL_Firmalar.Where(x=>x.dlt==0).OrderBy(x=>x.Firma);
                    json = JsonConvert.SerializeObject(firmalar.ToList());
                    Response.Write(json);
                }
                else if (servis == "PersonelFirma")
                {
                    int Firma_ID = Convert.ToInt32(Request.QueryString["Firma_ID"]);
                    var firmalar = ctx.TBL_Personel.Where(x => x.dlt == 0 && x.Firma_ID == Firma_ID).OrderBy(x => x.Ad);
                    json = JsonConvert.SerializeObject(firmalar.ToList());
                    Response.Write(json);
                }
                else if (servis == "Haritalar")
                {
                    int MapID = Convert.ToInt32(Request.QueryString["MapID"]);

                    var haritalar = ctx.TBL_Haritalar.Where(x => x.dlt == 0 && x.Map_ID == MapID).OrderBy(x => x.HaritaAdi).ToList();
                    json = JsonConvert.SerializeObject(haritalar.ToList());
                    Response.Write(json);
                }
                else if (servis == "Map")
                {
                    var map = (from m in ctx.TBL_Map
                               orderby m.Map
                               where m.dlt == 0
                               select new
                               {
                                   m.ID,
                                   m.Map,
                                   HaritaID = ctx.TBL_Haritalar.Where(x => x.dlt == 0 && x.Map_ID == m.ID).FirstOrDefault().ID
                               });
                    json = JsonConvert.SerializeObject(map.ToList());
                    Response.Write(json);
                }
                else if (servis == "Arsiv")
                {
                    string ip = Request.QueryString["ip"];
                    string jsonLink = "http://" + ip + "/movie/1/list/";

                    try
                    {
                        HttpWebRequest request = WebRequest.Create(jsonLink) as HttpWebRequest;
                        string jsonVerisi = "";
                        using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                        {
                            StreamReader reader = new StreamReader(response.GetResponseStream());
                            jsonVerisi = reader.ReadToEnd();

                        }
                        Response.Write(jsonVerisi);
                    }
                    catch { }
                }
                else if (servis == "Ayarlar")
                {
                    var ayarlar = ctx.TBL_Ayarlar.SingleOrDefault(x => x.ID == 1);
                    json = JsonConvert.SerializeObject(ayarlar);
                    Response.Write(json);
                }else if (servis== "Aksiyon") {
                    int tur = Convert.ToInt32(Request.QueryString["tur"]);
                    var sorgu = ctx.TBL_Aksiyon.Where(x=>x.dlt==0 && x.Gorev_ID==0).OrderByDescending(x=>x.Zaman);
                    
                    //if (tur == 1)
                    //{
                    //    json = JsonConvert.SerializeObject(sorgu);
                    //}
                    //else
                    //{
                        json = JsonConvert.SerializeObject(sorgu.Where(x => x.Gorundu == 0));
                        foreach (var item in sorgu)
                        {
                            item.Gorundu = 1;

                        }
                        ctx.SaveChanges();
                    //}
                    Response.Write(json);
                }
                else if (servis == "AksiyonKaydet")
                {
                    Durum durum = new Durum();
                    try
                    {
                        TBL_Aksiyon aksiyon = new TBL_Aksiyon();
                        aksiyon.Aciklama = Request.Form["aciklama"];
                        aksiyon.Resim = HttpUtility.UrlEncode(Request.Form["ResimData"]);
                        //aksiyon.Personel_ID = Convert.ToInt32(Request.Form["pid"]);
                        aksiyon.dlt = 0;
                        aksiyon.Gorundu = 0;
                        aksiyon.Zaman = DateTime.Now;
                        aksiyon.Gorev_ID = 0;
                        ctx.TBL_Aksiyon.Add(aksiyon);
                        ctx.SaveChanges();
                        durum.durum = 1;
                        durum.hata = "";
                    }
                    catch (Exception ex)
                    {
                        durum.durum = 0;
                        durum.hata = ex.Message;
                    }
                    json = JsonConvert.SerializeObject(durum);
                    Response.Write(json);
                }
                else if (servis == "AyarKaydet")
                {
                    Durum durum = new Durum();
                    try
                    {
                        double Oran = Convert.ToDouble(Request.Form["oran"]);
                        int Tolerans = Convert.ToInt32(Request.Form["tolerans"]);

                        TBL_Ayarlar ayarlar = ctx.TBL_Ayarlar.SingleOrDefault(x => x.ID == 1);
                        ayarlar.Oran = Oran;
                        ayarlar.Tolerans = Tolerans;
                        ctx.SaveChanges();

                        durum.durum = 1;
                        durum.hata = "";

                    }
                    catch (Exception ex)
                    {
                        durum.durum = 0;
                        durum.hata = ex.Message;
                    }
                    json = JsonConvert.SerializeObject(durum);
                    Response.Write(json);
                }
                else if (servis == "GorevGetir")
                {
                    int ID = Convert.ToInt32(Request.QueryString["ID"]);
                    Gorev gorev = new Gorev();
                    var sorgu = ctx.TBL_Gorevler.SingleOrDefault(x => x.dlt == 0 && x.ID == ID);
                    gorev.GorevBasligi = sorgu.GorevBasligi;
                    gorev.BaslangicTarihi = Convert.ToDateTime(sorgu.BaslangicTarihi);
                    gorev.BitisTarihi = Convert.ToDateTime(sorgu.BitisTarihi);
                    gorev.Personel_ID = Convert.ToInt32(sorgu.Personel_ID);
                    gorev.Durum = Convert.ToInt32(sorgu.Durum);
                    gorev.ID = ID;
                    gorev.Aciklama = sorgu.Aciklama;

                    json = JsonConvert.SerializeObject(gorev);
                    Response.Write(json);
                }
                else if (servis == "GorevDurum")
                {
                    int ID = Convert.ToInt32(Request.QueryString["id"]);
                    int durum = Convert.ToInt32(Request.QueryString["durum"]);
                    TBL_Gorevler gorev = ctx.TBL_Gorevler.SingleOrDefault(x => x.ID == ID && x.dlt == 0);
                    gorev.Durum = durum;
                    ctx.SaveChanges();
                    Response.Write(1);
                }
                else if (servis == "GorevIslem")
                {
                    int ID = Convert.ToInt32(Request.QueryString["id"]);
                    var sorgu = ctx.TBL_GorevlerPersonel.Where(x => x.dlt == 0 && x.Gorev_ID == ID).OrderByDescending(x => x.Zaman);
                    json = JsonConvert.SerializeObject(sorgu);
                    Response.Write(json);
                }
                else if (servis == "GorevSil")
                {
                    Durum durum = new Durum();
                    int ID = Convert.ToInt32(Request.QueryString["id"]);
                    string tur = Request.QueryString["tur"];

                    if (tur == "Gorevler")
                    {
                        TBL_Gorevler gorev = ctx.TBL_Gorevler.SingleOrDefault(x => x.dlt == 0 && x.ID == ID);
                        gorev.dlt = 1;
                        ctx.SaveChanges();
                        durum.durum = 1;
                        durum.hata = "";
                        json = JsonConvert.SerializeObject(durum);
                        Response.Write(json);
                    }
                    else
                    {
                        TBL_GorevlerPersonel gorev = ctx.TBL_GorevlerPersonel.SingleOrDefault(x => x.dlt == 0 && x.ID == ID);
                        gorev.dlt = 1;
                        ctx.SaveChanges();
                        durum.durum = 1;
                        durum.hata = "";
                        json = JsonConvert.SerializeObject(durum);
                        Response.Write(json);
                    }
                }
                else if (servis == "GorevKaydet")
                {
                    Durum durum = new Durum();
                    try
                    {
                        int ID = Convert.ToInt32(Request.QueryString["id"]);
                        string BaslangicTarihi = Request.Form["BaslangicTarihi"];
                        string BitisTarihi = Request.Form["BitisTarihi"];
                        int personel_ID = Convert.ToInt32(Request.Form["personel_ID"]);
                        string GorevBasligi = Request.Form["GorevBasligi"];
                        string Aciklama = Request.Form["Aciklama"];

                        if (BaslangicTarihi == "" || personel_ID == 0 || GorevBasligi == "")
                        {
                            durum.durum = 0;
                            durum.hata = "Lütfen alanları eksiksiz doldurunuz.";
                        }
                        else
                        {
                            if (ID == 0)
                            {
                                TBL_Gorevler gorev = new TBL_Gorevler();
                                gorev.BaslangicTarihi = TarihKontrol(BaslangicTarihi);
                                gorev.BitisTarihi = TarihKontrol(BitisTarihi);
                                gorev.Personel_ID = personel_ID;
                                gorev.GorevBasligi = GorevBasligi;
                                gorev.Aciklama = Aciklama;
                                gorev.Durum = 0;
                                gorev.dlt = 0;
                                ctx.TBL_Gorevler.Add(gorev);
                                ctx.SaveChanges();
                            }
                            else
                            {
                                TBL_Gorevler gorev = ctx.TBL_Gorevler.SingleOrDefault(x => x.dlt == 0 && x.ID == ID);
                                gorev.BaslangicTarihi = TarihKontrol(BaslangicTarihi);
                                gorev.BitisTarihi = TarihKontrol(BitisTarihi);
                                gorev.Personel_ID = personel_ID;
                                gorev.GorevBasligi = GorevBasligi;
                                gorev.Aciklama = Aciklama;

                                ctx.SaveChanges();
                            }
                            durum.durum = 1;
                            durum.hata = "";
                        }
                    }
                    catch
                    {
                        durum.durum = 0;
                        durum.hata = "Lütfen alanları eksiksiz doldurunuz.";
                    }

                    json = JsonConvert.SerializeObject(durum);
                    Response.Write(json);
                }
                else if (servis == "GorevListesi")
                {


                    string q = Request.QueryString["q"];

                    var gorevler = from g in ctx.TBL_Gorevler
                                   join p in ctx.TBL_Personel
                                   on g.Personel_ID equals p.ID
                                   where g.dlt == 0
                                   orderby g.BaslangicTarihi descending
                                   select new
                                   {
                                       g.ID,
                                       g.BaslangicTarihi,
                                       g.BitisTarihi,
                                       g.GorevBasligi,
                                       Personel = p.Ad + " " + p.Soyad,
                                       g.Durum,
                                       g.Aciklama,
                                       adet = ctx.TBL_GorevlerPersonel.Where(x => x.dlt == 0 && x.Gorev_ID == g.ID).Count()
                                   };
                    if (q != "tumu")
                    {
                        int d = Convert.ToInt32(q);
                        gorevler = gorevler.Where(x => x.Durum == d);
                    }

                    json = JsonConvert.SerializeObject(gorevler.ToList());
                    Response.Write(json);
                }
                else if (servis == "KonumKaydet")
                {
                    Durum durum = new Durum();
                    try
                    {
                        int id = Convert.ToInt32(Request.QueryString["id"]);
                        int x = Convert.ToInt32(Request.QueryString["x"]);
                        int y = Convert.ToInt32(Request.QueryString["y"]);
                        if (x < 0)
                        {
                            x = 0;
                        }
                        if (y < 0)
                        {
                            y = 0;
                        }
                        string no = Request.QueryString["no"];

                        TBL_Bolgeler bolge = ctx.TBL_Bolgeler.SingleOrDefault(s => s.ID == id);
                        if (no == "A1")
                        {
                            bolge.Anchor1_X = x;
                            bolge.Anchor1_Y = y;
                        }
                        else if (no == "A2")
                        {
                            bolge.Anchor2_X = x;
                            bolge.Anchor2_Y = y;
                        }
                        else if (no == "A3")
                        {
                            bolge.Anchor3_X = x;
                            bolge.Anchor3_Y = y;
                        }
                        else if (no == "AMaster")
                        {
                            bolge.AnchorMaster_X = x;
                            bolge.AnchorMaster_Y = y;
                        }
                        ctx.SaveChanges();

                        durum.durum = 1;
                        durum.hata = "";

                    }
                    catch (Exception ex)
                    {
                        durum.durum = 0;
                        durum.hata = ex.Message;
                    }
                    json = JsonConvert.SerializeObject(durum);
                    Response.Write(json);
                }
                else if (servis == "Tag")
                {
                    string tid = Request.QueryString["tid"];
                    var personel = (from p in ctx.TBL_Personel
                                    where p.TagNo == tid
                                    select new
                                    {
                                        isim = p.Ad + " " + p.Soyad,
                                        p.TagTipi
                                    });
                    json = JsonConvert.SerializeObject(personel);
                    Response.Write(json);
                }
                else if (servis == "ping")
                {
                    string ip = Request.QueryString["ip"];
                    Ping ping = new Ping();
                    PingReply DonenCevap = ping.Send(ip);
                    Durum durum = new Durum();
                    if (DonenCevap.Status == IPStatus.Success)
                    {
                        durum.durum = 1;
                    }
                    else
                    {
                        durum.durum = 0;
                    }
                    json = JsonConvert.SerializeObject(durum);
                    Response.Write(json);
                }
            }
            else
            {
                Durum durum = new Durum();
                durum.durum = 0;
                durum.hata = "Yetkili değilsiniz." + IP();
                json = JsonConvert.SerializeObject(durum);
                Response.Write(json);
            }
        }
    }
}