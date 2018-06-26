using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
namespace RTLS_Web.Ayarlar
{
    public partial class harita_Add : System.Web.UI.Page
    {
        RTLSEntities ctx = new RTLSEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            

        }

        protected void Kaydet_Click(object sender, EventArgs e)
        {
            TBL_Haritalar harita = new TBL_Haritalar();
            harita.dlt = 0;
            harita.HaritaAdi = HaritaAdi.Text;
            harita.Oran = Convert.ToInt32(Oran.Text);
            harita.Map_ID = Convert.ToInt32(Request.QueryString["MapID"]);
            ctx.TBL_Haritalar.Add(harita);
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

            Response.Redirect("harita.aspx?MapID=" + Request.QueryString["MapID"]);
        }
    }
}