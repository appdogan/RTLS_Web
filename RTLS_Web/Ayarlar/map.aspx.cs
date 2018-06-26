using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class harita : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RTLSEntities ctx = new RTLSEntities();

            if (string.IsNullOrEmpty(Request.QueryString["dlt"]) == false)
            {
                int dlt = Convert.ToInt32(Request.QueryString["dlt"]);
                var sorgu = ctx.TBL_Map.SingleOrDefault(x => x.ID == dlt);
                sorgu.dlt = 1;
                sorgu.dlt_Zaman = DateTime.Now;
                ctx.SaveChanges();
            }
            if (string.IsNullOrEmpty(Request.QueryString["d"]) == false)
            {
                string d = Request.QueryString["d"];
                int id = Convert.ToInt32(Request.QueryString["id"]);

                    if (id == 0)
                    {
                        TBL_Map dep = new TBL_Map();
                        dep.dlt = 0;
                        dep.Map = Request.QueryString["name"];
                        ctx.TBL_Map.Add(dep);
                        ctx.SaveChanges();
                    }
                    else
                    {
                        TBL_Map dep = ctx.TBL_Map.SingleOrDefault(x => x.ID == id && x.dlt == 0);
                        dep.Map = Request.QueryString["name"];
                        ctx.SaveChanges();
                    }
                    Response.Redirect("map.aspx");
              
            }


            var map = ctx.TBL_Map.Where(x => x.dlt == 0).OrderBy(x=>x.Map);
            RList.DataSource = map.ToList();
            RList.DataBind();
        }
    }
}