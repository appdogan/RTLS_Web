using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class personel_edit : System.Web.UI.Page
    {
        RTLSEntities ctx = new RTLSEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                int id = Convert.ToInt32(Request.QueryString["id"]);
                var personel = ctx.TBL_Personel.SingleOrDefault(x => x.ID == id && x.dlt == 0);
                Ad.Text = personel.Ad;
                Soyad.Text = personel.Soyad;
                TagNo.Text = personel.TagNo;
                Aciklama.Text = personel.Aciklama;
                Departman_ID.SelectedValue = personel.Departman_ID.ToString();
                Gorev_ID.SelectedValue = personel.Gorev_ID.ToString();
                Firma_ID.SelectedValue = personel.Firma_ID.ToString();
                KamraIp.Text = personel.KamraIp;

                Departman_ID.DataSource = ctx.TBL_Departman.Where(x=>x.dlt==0).OrderBy(x=>x.Departman).ToList();
                Departman_ID.DataTextField = "Departman";
                Departman_ID.DataValueField = "ID";
                Departman_ID.DataBind();

                Departman_ID.SelectedValue = personel.Departman_ID.ToString();

                Gorev_ID.DataSource = ctx.TBL_Gorev.Where(x => x.dlt == 0 && x.Departman_ID==personel.Departman_ID).OrderBy(x => x.Gorev).ToList();
                Gorev_ID.DataTextField = "Gorev";
                Gorev_ID.DataValueField = "ID";
                Gorev_ID.DataBind();

                Gorev_ID.SelectedValue = personel.Gorev_ID.ToString();

                Firma_ID.DataSource = ctx.TBL_Firmalar.Where(x => x.dlt == 0).OrderBy(x => x.Firma).ToList();
                Firma_ID.DataTextField = "Firma";
                Firma_ID.DataValueField = "ID";
                Firma_ID.DataBind();

                Firma_ID.SelectedValue = personel.Firma_ID.ToString();

                TagTipi.Items.Add(new ListItem("İnsan", "fa-male"));
                TagTipi.Items.Add(new ListItem("Araç", "fa-car"));
                TagTipi.Items.Add(new ListItem("Cihaz", "fa-cube"));

                TagTipi.SelectedValue = personel.TagTipi;
            }            
        }

        protected void Kaydet_Click(object sender, EventArgs e)
        {
            int id = Convert.ToInt32(Request.QueryString["id"]);
            var personel = ctx.TBL_Personel.SingleOrDefault(x => x.ID == id && x.dlt == 0);
            personel.Ad = Ad.Text;
            personel.Soyad = Soyad.Text;
            personel.TagNo = TagNo.Text;
            personel.Aciklama = Aciklama.Text;
            personel.Departman_ID = Convert.ToInt32(Departman_ID.SelectedValue);
            personel.Gorev_ID = Convert.ToInt32(Gorev_ID.SelectedValue);
            personel.Firma_ID = Convert.ToInt32(Firma_ID.SelectedValue);
            personel.KamraIp = KamraIp.Text;
            personel.TagTipi = TagTipi.SelectedValue;

            ctx.SaveChanges();
            Response.Redirect("personel.aspx");
        }

        protected void Departman_ID_SelectedIndexChanged(object sender, EventArgs e)
        {
            int departman = Convert.ToInt32(Departman_ID.SelectedValue);
            Gorev_ID.DataSource = ctx.TBL_Gorev.Where(x => x.dlt == 0 && x.Departman_ID == departman).OrderBy(x => x.Gorev).ToList();
            Gorev_ID.DataTextField = "Gorev";
            Gorev_ID.DataValueField = "ID";
            Gorev_ID.DataBind();
        }
    }
}