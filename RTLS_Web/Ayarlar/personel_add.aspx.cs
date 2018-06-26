using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class personel_add : System.Web.UI.Page
    {
        RTLSEntities ctx = new RTLSEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                var dep= (from d in ctx.TBL_Departman
                          select new
                          {
                              d.Departman,
                              d.ID,
                              adet=ctx.TBL_Gorev.Where(x=>x.dlt==0 && x.Departman_ID==d.ID).Count()
                          }).ToList();
                Departman_ID.DataSource = dep.Where(x => x.adet > 0).ToList();
                                          //ctx.TBL_Departman.Where(x => x.dlt == 0).OrderBy(x => x.Departman).ToList();
                Departman_ID.DataTextField = "Departman";
                Departman_ID.DataValueField = "ID";
                Departman_ID.DataBind();

                int departman = Convert.ToInt32(Departman_ID.SelectedValue);
                Gorev_ID.DataSource = ctx.TBL_Gorev.Where(x => x.dlt == 0 && x.Departman_ID == departman).OrderBy(x => x.Gorev).ToList();
                Gorev_ID.DataTextField = "Gorev";
                Gorev_ID.DataValueField = "ID";
                Gorev_ID.DataBind();

                Firma_ID.DataSource = ctx.TBL_Firmalar.Where(x => x.dlt == 0).OrderBy(x => x.Firma).ToList();
                Firma_ID.DataTextField = "Firma";
                Firma_ID.DataValueField = "ID";
                Firma_ID.DataBind();

                TagTipi.Items.Add(new ListItem("İnsan", "fa-male"));
                TagTipi.Items.Add(new ListItem("Araç", "fa-car"));
                TagTipi.Items.Add(new ListItem("Cihaz", "fa-cube"));
            }
        }

        protected void Kaydet_Click(object sender, EventArgs e)
        {
            TBL_Personel personel = new TBL_Personel();
            personel.Ad = Ad.Text;
            personel.Soyad = Soyad.Text;
            personel.TagNo = TagNo.Text;
            personel.Aciklama = Aciklama.Text;
            personel.Departman_ID = Convert.ToInt32(Departman_ID.SelectedValue);
            personel.Gorev_ID = Convert.ToInt32(Gorev_ID.SelectedValue);
            personel.Firma_ID = Convert.ToInt32(Firma_ID.SelectedValue);
            personel.KamraIp = KamraIp.Text;
            personel.TagTipi = TagTipi.SelectedValue;
            personel.dlt = 0;

            ctx.TBL_Personel.Add(personel);
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