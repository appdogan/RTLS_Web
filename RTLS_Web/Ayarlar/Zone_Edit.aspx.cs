using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class Zone_Edit : System.Web.UI.Page
    {
        RTLSEntities ctx = new RTLSEntities();
        Class1 klas = new Class1();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                int ID = Convert.ToInt32(Request.QueryString["ID"]);
                TBL_Bolgeler bolge = ctx.TBL_Bolgeler.SingleOrDefault(x => x.dlt == 0 && x.ID == ID);
                BolgeAdi.Text = bolge.BolgeAdi;
                Anchor1_ID.Text = bolge.Anchor1_ID.ToString();
                Anchor2_ID.Text = bolge.Anchor2_ID.ToString();
                Anchor3_ID.Text = bolge.Anchor3_ID.ToString();
                Anchor1_Ip.Text = bolge.Anchor1_Ip.ToString();
                Anchor2_Ip.Text = bolge.Anchor2_Ip.ToString();
                Anchor3_Ip.Text = bolge.Anchor3_Ip.ToString();
                Anchor1_Z.Text = bolge.Anchor1_Z.ToString();
                Anchor2_Z.Text = bolge.Anchor2_Z.ToString();
                Anchor3_Z.Text = bolge.Anchor3_Z.ToString();
                AnchorMaster_ID.Text = bolge.AnchorMaster_ID.ToString();
                AnchorMaster_Ip.Text = bolge.AnchorMaster_Ip;
            }
        }
        protected void Kaydet_Click(object sender, EventArgs e)
        {
            int ID = Convert.ToInt32(Request.QueryString["ID"]);
            TBL_Bolgeler bolge = ctx.TBL_Bolgeler.SingleOrDefault(x=>x.dlt==0 && x.ID==ID);
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
            ctx.SaveChanges();

            Response.Redirect("Zone.aspx?MapID=" + Request.QueryString["MapID"] + "&HaritaID=" + Request.QueryString["HaritaID"]);
        }
    }
}