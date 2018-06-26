using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Net.Sockets;
using System.IO;
using System.Text.RegularExpressions;

namespace RTLSServer
{
    class islemler
    {
        RTLSEntities ctx = new RTLSEntities();

        public string IpBul()
        {
            IPAddress[] localIP = Dns.GetHostAddresses(Dns.GetHostName());
            string ipAdresi = "";
            foreach (IPAddress address in localIP)
            {
                if (address.AddressFamily == AddressFamily.InterNetwork)
                {
                    ipAdresi = address.ToString();
                }
            }
            return ipAdresi;
        }

        public bool Gonder(string konu, string icerik, string mails)
        {
            bool kontrol = true;
            try
            {
                MailMessage ePosta = new MailMessage();
                ePosta.From = new MailAddress("gurol.afsar@globax.com.tr");
                string[] mailler = mails.Split(',');

                for (var i = 0; i < mailler.Length; i++)
                {
                    ePosta.To.Add(mailler[i]);
                }
                ePosta.Subject = konu;
                ePosta.Body = icerik;
                ePosta.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Credentials = new System.Net.NetworkCredential("bayram.kaya@globax.com.tr", "B.1407++k");
                smtp.Port = 587;

                smtp.Host = "mail.globax.com.tr";
                smtp.EnableSsl = false;
                object userState = ePosta;
                smtp.SendAsync(ePosta, (object)ePosta);

            }
            catch (Exception ex)
            {
                kontrol = false;
                //HaberlesmeLog(ex.Message);
            }
            return kontrol;
        }
        int oran = 1;
        int tolerans = 0;
        int Olcu1 = 0;
        int Olcu2 = 0;
        public void ayarlar()
        {
            var ayar = ctx.TBL_Ayarlar.SingleOrDefault(x => x.ID == 1);
            oran = (int)ayar.Oran;
            tolerans = (int)ayar.Tolerans;
        }

        string veri0 = "";

        string A1;
        double A1_mesafe;
        string A2;
        double A2_mesafe;
        string A3;
        double A3_mesafe;

        string[] konums = new string[500];
        string[] btns = new string[500];
        int[] haritas = new int[500];
        public void HataLog(string text)
        {
            string path = @"C:\RTLS_Log\Log.txt";
            if (File.Exists(path) == false)
            {
                File.CreateText(path);
            }
            StreamWriter SW = File.AppendText(path);
            SW.WriteLine(Cift(DateTime.Now.Hour) + ":" + Cift(DateTime.Now.Minute) + ":" + Cift(DateTime.Now.Second) + "|" + text);
            SW.Close();
            SW.Dispose();
        }
        public void Log(string veri)
        {
            string TID = "";

            Regex r = new Regex(@"^[0123456789,]*$");
            if (r.IsMatch(veri))
            {
                if (veri0 != veri)
                {
                    veri0 = veri;


                    A1 = "";
                    A1_mesafe = 0;
                    A2 = "";
                    A2_mesafe = 0;
                    A3 = "";
                    A3_mesafe = 0;
                    string[] VeriDizisi = veri.Split(',');
                    if (VeriDizisi.Length == 11) //Konum verisi
                    {
                        A1 = VeriDizisi[0];
                        A1_mesafe = Convert.ToInt32(VeriDizisi[1]);
                        A1_mesafe += Convert.ToInt32(VeriDizisi[2]) * 256;
                        A2 = VeriDizisi[3];
                        A2_mesafe = Convert.ToInt32(VeriDizisi[4]);
                        A2_mesafe += Convert.ToInt32(VeriDizisi[5]) * 256;
                        A3 = VeriDizisi[6];
                        A3_mesafe = Convert.ToInt32(VeriDizisi[7]);
                        A3_mesafe += Convert.ToInt32(VeriDizisi[8]) * 256;
                        TID = VeriDizisi[9];

                        int a1 = Convert.ToInt32(A1);
                        try
                        {
                            var haritasorgu = ctx.TBL_Bolgeler.SingleOrDefault(x => x.dlt == 0 && x.Anchor1_ID == a1);
                            int haritaID = (int)haritasorgu.Harita_ID;

                            var harita = ctx.TBL_Haritalar.SingleOrDefault(x => x.ID == haritaID);
                            oran = Convert.ToInt32(harita.Oran);

                            A1_mesafe = Math.Round(A1_mesafe / oran);
                            A2_mesafe = Math.Round(A2_mesafe / oran);
                            A3_mesafe = Math.Round(A3_mesafe / oran);



                            Olcu1 = (int)haritasorgu.Anchor2_X - (int)haritasorgu.Anchor1_X;
                            Olcu2 = (int)haritasorgu.Anchor3_Y - (int)haritasorgu.Anchor1_Y;

                            A1_mesafe = Math.Round(pisagor(Convert.ToInt32(A1_mesafe), Convert.ToInt32(haritasorgu.Anchor1_Z) / oran), 0);
                            A2_mesafe = Math.Round(pisagor(Convert.ToInt32(A2_mesafe), Convert.ToInt32(haritasorgu.Anchor2_Z) / oran), 0);
                            A3_mesafe = Math.Round(pisagor(Convert.ToInt32(A3_mesafe), Convert.ToInt32(haritasorgu.Anchor3_Z) / oran), 0);

                            double yy = (kare(A1_mesafe) - kare(A3_mesafe) + kare(Olcu2)) / (2 * Olcu2);
                            double xx = (kare(A1_mesafe) - kare(A2_mesafe) + kare(Olcu1)) / (2 * Olcu1);

                            int A1x = (int)haritasorgu.Anchor1_X + 50;
                            int A1y = (int)haritasorgu.Anchor1_Y + 50;

                            veri = Math.Round(A1x + xx, 0).ToString() + '|' + Math.Round(A1y + yy, 0).ToString();

                            if (konums[Convert.ToInt32(TID)] != veri)
                            {
                                konums[Convert.ToInt32(TID)] = veri;
                                haritas[Convert.ToInt32(TID)] = haritaID;

                                string tarih = DateTime.Now.Year.ToString() + Cift(DateTime.Now.Month) + Cift(DateTime.Now.Day);
                                try
                                {
                                    var personel = ctx.TBL_Personel.SingleOrDefault(x => x.dlt == 0 && x.TagNo == TID);
                                    DateTime t = tarihDonustur(tarih);
                                    var rapor = ctx.TBL_Rapor.Where(x => x.PersonelID == personel.ID && x.HaritaID == haritaID && x.dlt == 0 && x.Tarih == t);
                                    if (rapor.Count() > 0)
                                    {
                                        double fark = (DateTime.Now - Convert.ToDateTime(rapor.FirstOrDefault().SonOkuma)).TotalSeconds;
                                        if (fark <= 500)
                                        {
                                            rapor.FirstOrDefault().ToplamZaman += (int)fark;
                                        }
                                        rapor.FirstOrDefault().SonOkuma = DateTime.Now;
                                        ctx.SaveChanges();
                                    }
                                    else
                                    {
                                        TBL_Rapor rapor1 = new TBL_Rapor();
                                        rapor1.PersonelID = personel.ID;
                                        rapor1.HaritaID = haritaID;
                                        rapor1.Tarih = tarihDonustur(tarih);
                                        rapor1.Tag = TID;
                                        rapor1.ToplamZaman = 0;
                                        rapor1.BolgeID = 0;
                                        rapor1.dlt = 0;
                                        rapor1.SonOkuma = DateTime.Now;
                                        ctx.TBL_Rapor.Add(rapor1);
                                        ctx.SaveChanges();
                                    }
                                }
                                catch (Exception ex)
                                {
                                    HataLog(ex.Message);
                                }
                                //----
                                string path = @"C:\RTLS_Log\" + TID + @"\";
                                if (Directory.Exists(path) == false)
                                {
                                    Directory.CreateDirectory(path);
                                }
                                path = @"C:\RTLS_Log\" + TID + @"\" + haritaID + @"\";
                                if (Directory.Exists(path) == false)
                                {
                                    Directory.CreateDirectory(path);
                                }
                                path = path + tarih + @".txt";
                                if (File.Exists(path) == false)
                                {
                                    File.CreateText(path);
                                }
                                try
                                {
                                    StreamWriter SW = File.AppendText(path);
                                    SW.WriteLine(Cift(DateTime.Now.Hour) + ":" + Cift(DateTime.Now.Minute) + ":" + Cift(DateTime.Now.Second) + "|" + veri);
                                    SW.Close();
                                    SW.Dispose();
                                }
                                catch (Exception ex)
                                {
                                    HataLog(ex.Message);
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            HataLog("Error(2):" + ex.Message);
                        }
                    }
                    else if (VeriDizisi.Length == 4) //Buton verisi
                    {
                        string Btn1 = VeriDizisi[0];
                        string Btn2 = VeriDizisi[1];
                        string Btn3 = VeriDizisi[2];

                        if (Btn1 == "15" || Btn2 == "15" || Btn3 == "15")
                        {

                        }
                        else
                        {
                            TID = VeriDizisi[3];
                            int haritaID = haritas[Convert.ToInt32(TID)];
                            if (btns[Convert.ToInt32(TID)] != (Btn1 + "," + Btn2 + "," + Btn3) && haritaID != 0)
                            {
                                btns[Convert.ToInt32(TID)] = (Btn1 + "," + Btn2 + "," + Btn3);

                                string tarih = DateTime.Now.Year.ToString() + Cift(DateTime.Now.Month) + Cift(DateTime.Now.Day);

                                string path = @"C:\RTLS_Log\" + TID + @"\";
                                if (Directory.Exists(path) == false)
                                {
                                    Directory.CreateDirectory(path);
                                }
                                path = @"C:\RTLS_Log\" + TID + @"\" + haritaID + @"\";
                                if (Directory.Exists(path) == false)
                                {
                                    Directory.CreateDirectory(path);
                                }
                                path = path + tarih + @".txt";
                                if (File.Exists(path) == false)
                                {
                                    File.CreateText(path);
                                }
                                try
                                {
                                    StreamWriter SW = File.AppendText(path);
                                    SW.WriteLine(Cift(DateTime.Now.Hour) + ":" + Cift(DateTime.Now.Minute) + ":" + Cift(DateTime.Now.Second) + "|" + konums[Convert.ToInt32(TID)] + "|" + (Btn1 + "," + Btn2 + "," + Btn3));
                                    SW.Close();
                                    SW.Dispose();
                                }
                                catch (Exception ex)
                                {
                                    HataLog(ex.Message);
                                }
                            }
                        }

                    }

                }
            }
        }
        public string Cift(int t)
        {
            if (t < 10)
            {
                return "0" + t;
            }
            else
            {
                return t.ToString();
            }
        }
        public DateTime tarihDonustur(string tarih)
        {
            string yil = tarih.ToString().Substring(0, 4);
            string ay = tarih.ToString().Substring(4, 2);
            string gun = tarih.ToString().Substring(6, 2);
            return Convert.ToDateTime(gun + "." + ay + "." + yil);
        }
        public double pisagor(int a, int c)
        {
            return Math.Sqrt((a * a) - (c * c));
        }
        public double orantila(double x, double HaritaOrani)
        {
            return x / 2;
        }
        public double Hesap1(int A, int B, int Uzunluk)
        {
            double a = (kare(A) - kare(B) + kare(Uzunluk)) / (2 * Uzunluk);
            //a = Math.Round(a, 0);
            //if (a > B) { a = B; }
            //double sonuc=KareKok(kare(B) - kare(a));
            return a;
        }
        public double kare(double A)
        {
            return A * A;
        }
        public double KareKok(double deger)
        {
            return Math.Sqrt(deger);
        }
        public int sn(string saat)
        {
            string[] zaman = saat.Split(':');
            return ((Convert.ToInt32(zaman[0]) * 60) * 60) + (Convert.ToInt32(zaman[1]) * 60) + Convert.ToInt32(zaman[2]);
        }
        public string snZaman(int sn)
        {
            int yil = 0;
            int ay = 0;
            int gun = 0;
            int saat = 0;
            int dakika = 0;

            yil = sn / 31104000;
            sn = sn - yil * 3110400;

            ay = sn / 2592000;
            sn = sn - ay * 2592000;

            gun = sn / 86400;
            sn = sn - gun * 86400;

            saat = sn / 3600;
            sn = sn - saat * 3600;

            dakika = sn / 60;
            sn = sn - dakika * 60;

            string sure = "";
            if (yil > 0)
            {
                sure = yil + " Y ";
            }
            else
            {
                if (ay > 0)
                {
                    sure += ay + " M ";
                }
                else
                {
                    if (gun > 0)
                    {
                        sure += gun + " D ";
                    }
                    else
                    {
                        if (saat > 0)
                        {
                            sure += saat + ":";
                        }
                        else
                        {
                            sure += "00:";
                            if (dakika > 0)
                            {
                                sure += dakika + ":";
                            }
                        }
                    }
                }
            }

            return sure + sn;
        }
    }
}
