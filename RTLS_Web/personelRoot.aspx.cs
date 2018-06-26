using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Web.Script.Serialization;
namespace RTLS_Web
{
    public partial class personelRoot : System.Web.UI.Page
    {
        RTLSEntities ctx = new RTLSEntities();
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
        protected void Page_Load(object sender, EventArgs e)
        {
            try { 
            int p_ID = Convert.ToInt32(Request.QueryString["p_ID"]);
            int h_ID = Convert.ToInt32(Request.QueryString["h_ID"]);
            oran.InnerHtml = ctx.TBL_Haritalar.SingleOrDefault(x => x.ID == h_ID).Oran.ToString();

            DateTime tarih = Convert.ToDateTime(Request.QueryString["tarih"]);

            var personel = ctx.TBL_Personel.SingleOrDefault(x => x.ID == p_ID && x.dlt == 0);

            string path = @"C:\RTLS_Log\" + personel.TagNo + @"\" + h_ID + @"\" + tarih.Year + Cift(tarih.Month) + Cift(tarih.Day) + @".txt";
            StreamReader TxtOku = File.OpenText(path);
            veri.InnerHtml= TxtOku.ReadToEnd();
            TxtOku.Close();
            TxtOku.Dispose();

            //personel_isim.InnerHtml = personel.Ad + " " + personel.Soyad;
            //personel_tarih.InnerHtml = tarih.ToString("dd.MM.yyyy");
            }
            catch {
                Response.Write("Hata oluştu.");
            }
        }
        public int rndSayi()
        {
            Random rastgele = new Random();
            return rastgele.Next();
        }
    }
   
}