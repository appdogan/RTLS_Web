using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
namespace RTLS_Web.Ayarlar
{
    public partial class harita_Edit : System.Web.UI.Page
    {
        RTLSEntities ctx = new RTLSEntities();
        Random rastgele = new Random();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                int ID = Convert.ToInt32(Request.QueryString["ID"]);
                TBL_Haritalar harita = ctx.TBL_Haritalar.SingleOrDefault(x => x.dlt == 0 && x.ID == ID);
                HaritaAdi.Text = harita.HaritaAdi;
                Oran.Text = harita.Oran.ToString();
            }
        }

        protected void Kaydet_Click(object sender, EventArgs e)
        {
            int ID = Convert.ToInt32(Request.QueryString["ID"]);
            TBL_Haritalar harita = ctx.TBL_Haritalar.SingleOrDefault(x=>x.dlt==0 && x.ID==ID);
            harita.HaritaAdi = HaritaAdi.Text;
            harita.Oran = Convert.ToInt32(Oran.Text);
            ctx.SaveChanges();

            try
            {
                foreach (HttpPostedFile postedFile in FileUpload1.PostedFiles)
                {
                    string uzanti = Path.GetExtension(postedFile.FileName);
                    //if (uzanti == ".jpg" || uzanti == ".JPG" || uzanti == ".JPEG")
                    //{
                    
                    postedFile.SaveAs(Server.MapPath("/Content/Data/Map/") + harita.ID + ".jpg");
                    //}
                }
            }
            catch { }

            Response.Redirect("harita.aspx?MapID=" + harita.Map_ID);
        }
        public string imgKontrol()
        {
            int id = Convert.ToInt32(Request.QueryString["ID"]);
            if (File.Exists(Server.MapPath("~/Content/Data/Map/" + id + ".jpg")))
            {
                string html="<div class=\"input-group-prepend\">";
                html += "<div class=\"input-group-text\">";
                html += "<a target=\"_blank\" href=\"/Content/Data/Map/" + id + ".jpg?q=" + rastgele.Next() + "\"><i class=\"fas fa-map\"></i></a></div>";
                html += "</div>";
                return html;
            }
            else
            {
                return "";
            }
        }
    }
}