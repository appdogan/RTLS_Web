using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RTLS_Web.Ayarlar
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                Panel1.Visible = false;
            }
        }

        protected void Giris_Click(object sender, EventArgs e)
        {
            if (inputPassword.Text == "123")
            {
                Session["Admin"] = "1";
                Response.Redirect("personel.aspx");
            }
            else
            {
                Panel1.Visible = true;
            }
        }
    }
}