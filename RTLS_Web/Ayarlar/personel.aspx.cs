using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class personel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RTLSEntities ctx = new RTLSEntities();
            
            if (string.IsNullOrEmpty(Request.QueryString["dlt"])==false)
            {
                int dlt = Convert.ToInt32(Request.QueryString["dlt"]);
                var sorgu = ctx.TBL_Personel.SingleOrDefault(x=>x.ID==dlt);
                sorgu.dlt = 1;
                ctx.SaveChanges();
            }

            var personel = from p in ctx.TBL_Personel
                           join f in ctx.TBL_Firmalar
                           on p.Firma_ID equals f.ID
                           join d in ctx.TBL_Departman
                           on p.Departman_ID equals d.ID
                           join g in ctx.TBL_Gorev
                           on p.Gorev_ID equals g.ID
                           where p.dlt == 0
                           select new
                           {
                               p.ID,
                               p.Ad,
                               p.Soyad,
                               p.TagNo,
                               p.TagTipi,
                               p.KamraIp,
                               f.Firma,
                               d.Departman,
                               g.Gorev
                           };
            RList.DataSource = personel.ToList();
            RList.DataBind();
        }
    }
}