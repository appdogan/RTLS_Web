using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class Zone_Add : System.Web.UI.Page
    {
        RTLSEntities ctx = new RTLSEntities();
        Class1 klas = new Class1();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void Kaydet_Click(object sender, EventArgs e)
        {
            TBL_Bolgeler bolge = new TBL_Bolgeler();
            bolge.dlt = 0;
            bolge.BolgeAdi = BolgeAdi.Text;
            bolge.Anchor1_ID = klas.kontrol(Anchor1_ID.Text,0);
            bolge.Anchor2_ID = klas.kontrol(Anchor2_ID.Text,0);
            bolge.Anchor3_ID = klas.kontrol(Anchor3_ID.Text,0);
            bolge.AnchorMaster_ID = klas.kontrol(AnchorMaster_ID.Text,0);

            bolge.Anchor1_Ip = Anchor1_Ip.Text;
            bolge.Anchor2_Ip = Anchor2_Ip.Text;
            bolge.Anchor3_Ip = Anchor3_Ip.Text;
            bolge.AnchorMaster_Ip = AnchorMaster_Ip.Text;

            bolge.Anchor1_Z = klas.kontrol(Anchor1_Z.Text,0);
            bolge.Anchor2_Z = klas.kontrol(Anchor2_Z.Text,0);
            bolge.Anchor3_Z = klas.kontrol(Anchor3_Z.Text,0);

            bolge.Harita_ID = Convert.ToInt32(Request.QueryString["HaritaID"]);
            ctx.TBL_Bolgeler.Add(bolge);
            ctx.SaveChanges();

            Response.Redirect("Zone.aspx?MapID=" + Request.QueryString["MapID"] + "&HaritaID=" + Request.QueryString["HaritaID"]);
        }
    }
}