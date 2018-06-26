using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RTLS_Web.Ayarlar
{
    public class Class1
    {
        public int kontrol(string d, int v)
        {
            if (string.IsNullOrEmpty(d))
            {
                return v;
            }
            else
            {
                return Convert.ToInt32(d);
            }
        }
    }
}