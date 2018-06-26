using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class firma : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RTLSEntities ctx = new RTLSEntities();
            if (string.IsNullOrEmpty(Request.QueryString["dlt"]) == false)
            {
                int dlt = Convert.ToInt32(Request.QueryString["dlt"]);
                var sorgu = ctx.TBL_Firmalar.SingleOrDefault(x => x.ID == dlt);
                sorgu.dlt = 1;
                ctx.SaveChanges();
            }

            if (string.IsNullOrEmpty(Request.QueryString["d"]) == false)
            {
                string d = Request.QueryString["d"];
                int id = Convert.ToInt32(Request.QueryString["id"]);
        
                    if (id == 0)
                    {
                        TBL_Firmalar dep = new TBL_Firmalar();
                        dep.dlt = 0;
                        dep.Firma = Request.QueryString["name"];
                        ctx.TBL_Firmalar.Add(dep);
                        ctx.SaveChanges();
                    }
                    else
                    {
                        TBL_Firmalar dep = ctx.TBL_Firmalar.SingleOrDefault(x => x.ID == id && x.dlt == 0);
                        dep.Firma = Request.QueryString["name"];
                        ctx.SaveChanges();
                    }
                    Response.Redirect("firma.aspx");
            }


            var firma = ctx.TBL_Firmalar.Where(x => x.dlt == 0).OrderBy(x => x.Firma);
            RList.DataSource = firma.ToList();
            RList.DataBind();
        }
    }
}