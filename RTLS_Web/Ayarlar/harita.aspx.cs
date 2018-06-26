using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
namespace RTLS_Web.Ayarlar
{
    public partial class harita1 : System.Web.UI.Page
    {
        Random rastgele = new Random();
        protected void Page_Load(object sender, EventArgs e)
        {
            RTLSEntities ctx = new RTLSEntities();
            
            if (string.IsNullOrEmpty(Request.QueryString["dlt"]) == false)
            {
                int dlt = Convert.ToInt32(Request.QueryString["dlt"]);
                var sorgu = ctx.TBL_Haritalar.SingleOrDefault(x => x.ID == dlt);
                sorgu.dlt = 1;
                sorgu.dlt_Zaman = DateTime.Now;
                ctx.SaveChanges();
            }
            int MapID = Convert.ToInt32(Request.QueryString["MapID"]);
            baslik.InnerHtml = ctx.TBL_Map.SingleOrDefault(x=>x.ID== MapID).Map;

            var bolge = ctx.TBL_Haritalar.Where(x => x.dlt == 0 && x.Map_ID==MapID).OrderBy(x => x.HaritaAdi);
            RList.DataSource = bolge.ToList();
            RList.DataBind();
        }
        public string imgKontrol(int id)
        {
            if (File.Exists(Server.MapPath("~/Content/Data/Map/" + id + ".jpg"))) { 
                return "<a target=\"_blank\" href=\"/Content/Data/Map/" + id + ".jpg?q=" + rastgele.Next() + "\"><i class=\"fas fa-map\"></i></a>";
            }
            else
            {
                return  "";
            }
        }
    }
}