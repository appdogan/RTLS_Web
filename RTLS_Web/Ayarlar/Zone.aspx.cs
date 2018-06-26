using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class Anchor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RTLSEntities ctx = new RTLSEntities();

            if (string.IsNullOrEmpty(Request.QueryString["dlt"]) == false)
            {
                int dlt = Convert.ToInt32(Request.QueryString["dlt"]);
                var sorgu = ctx.TBL_Bolgeler.SingleOrDefault(x => x.ID == dlt);
                sorgu.dlt = 1;
                sorgu.dlt_Zaman = DateTime.Now;
                ctx.SaveChanges();
            }
            int MapID = Convert.ToInt32(Request.QueryString["MapID"]);
            int HaritaID = Convert.ToInt32(Request.QueryString["HaritaID"]);
            baslik.InnerHtml = ctx.TBL_Haritalar.SingleOrDefault(x => x.ID == HaritaID).HaritaAdi;

            var bolge = ctx.TBL_Bolgeler.Where(x => x.dlt == 0 && x.Harita_ID == HaritaID).OrderBy(x => x.BolgeAdi);
            RList.DataSource = bolge.ToList();
            RList.DataBind();
        }
    }
}