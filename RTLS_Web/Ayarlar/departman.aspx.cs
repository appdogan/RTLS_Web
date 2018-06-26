using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class departman : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RTLSEntities ctx = new RTLSEntities();
            gorevekle.Visible = false;
            if (string.IsNullOrEmpty(Request.QueryString["dlt"]) == false)
            {
                int dlt = Convert.ToInt32(Request.QueryString["dlt"]);
                var sorgu = ctx.TBL_Departman.SingleOrDefault(x => x.ID == dlt);
                sorgu.dlt = 1;
                ctx.SaveChanges();
            }
            if (string.IsNullOrEmpty(Request.QueryString["dltG"]) == false)
            {
                int dlt = Convert.ToInt32(Request.QueryString["dltG"]);
                var sorgu = ctx.TBL_Gorev.SingleOrDefault(x => x.ID == dlt);
                sorgu.dlt = 1;
                ctx.SaveChanges();
            }
            if (string.IsNullOrEmpty(Request.QueryString["d"]) == false)
            {
                string d = Request.QueryString["d"];
                int id = Convert.ToInt32(Request.QueryString["id"]);
                if (d == "departman")
                {
                    if (id == 0)
                    {
                        TBL_Departman dep = new TBL_Departman();
                        dep.dlt = 0;
                        dep.Departman = Request.QueryString["name"];
                        ctx.TBL_Departman.Add(dep);
                        ctx.SaveChanges();
                    }
                    else
                    {
                        TBL_Departman dep = ctx.TBL_Departman.SingleOrDefault(x => x.ID == id && x.dlt == 0);
                        dep.Departman = Request.QueryString["name"];
                        ctx.SaveChanges();
                    }
                    Response.Redirect("departman.aspx");
                }
                else if (d == "gorev")
                {
                    if (id == 0)
                    {
                        TBL_Gorev gor = new TBL_Gorev();
                        gor.dlt = 0;
                        gor.Gorev = Request.QueryString["name"];
                        gor.Departman_ID = Convert.ToInt32(Request.QueryString["DID"]);
                        ctx.TBL_Gorev.Add(gor);
                        ctx.SaveChanges();
                    }
                    else
                    {
                        TBL_Gorev gor = ctx.TBL_Gorev.SingleOrDefault(x => x.ID == id && x.dlt == 0);
                        gor.Gorev = Request.QueryString["name"];
                        ctx.SaveChanges();
                    }
                    Response.Redirect("departman.aspx?DID=" + Request.QueryString["DID"]);
                }
            }


            var departman = ctx.TBL_Departman.Where(x => x.dlt == 0).OrderBy(x => x.Departman);
            RList.DataSource = departman.ToList();
            RList.DataBind();

            if (string.IsNullOrEmpty(Request.QueryString["DID"]) == false)
            {
                gorevekle.Visible = true;
                int DID = Convert.ToInt32(Request.QueryString["DID"]);

                var dep = ctx.TBL_Departman.SingleOrDefault(x => x.ID == DID);
                gorevBaslik.InnerHtml = dep.Departman + " Görevleri";
                var gorev = ctx.TBL_Gorev.Where(x => x.dlt == 0 && x.Departman_ID == DID).OrderBy(x => x.Gorev);
                RListG.DataSource = gorev.ToList();
                RListG.DataBind();
            }
        }
    }
}