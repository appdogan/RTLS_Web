using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Threading;
using System.IO;

namespace RTLSServer
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        delegate void Dveri(string text);
        
        delegate void DtextLog(string text);
        delegate void Ddata(int i);
        islemler islem = new islemler();
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
        public void veriLog(string text)
        {
            try
            {
                if (this.textBox1.InvokeRequired)
                {
                    Dveri d = new Dveri(veriLog);
                    this.Invoke(d, new object[] { text });
                }
                else
                {
                    this.textBox1.Text = text;
                }
            }
            catch { }
        }

        private void textLog(string text)
        {
            try
            {
                if (this.textBoxCmd.InvokeRequired)
                {
                    DtextLog d = new DtextLog(textLog);
                    this.Invoke(d, new object[] { text });
                }
                else
                {
                    if (this.textBoxCmd.Text.Length > 4000)
                    {
                        this.textBoxCmd.Text = "";
                    }
                    if (text.Substring(1, 2) != @":\")
                    {
                        if (text.IndexOf("MaxListeners") > 0 || text.IndexOf("at Object") > 0)
                        {
                            timer1.Stop();
                            cikis();
                            Thread.Sleep(3000);
                            StartStop = 1;
                            basla();
                        }
                        else
                        {
                            //if (text.IndexOf("ws") == -1 && text.IndexOf("at") == -1) { 
                            islem.Log(text);
                            this.textBoxCmd.Text += text + System.Environment.NewLine;
                            this.textBoxCmd.SelectionStart = textBoxCmd.Text.Length;
                            this.textBoxCmd.ScrollToCaret();
                            // }
                        }
                    }
                }
            }
            catch(Exception ex) {
                HataLog(ex.Message);
            }
        }
        private void textData(int i)
        {
            try
            {
                if (this.label1.InvokeRequired)
                {
                    Ddata d = new Ddata(textData);
                    this.Invoke(d, new object[] { i });
                }
                else
                {
                    if (i == 1)
                    {
                        label1.BackColor = Color.Green;
                        timer1.Start();
                    }
                    else
                    {
                        label1.BackColor = Color.Red;
                    }
                }
            }
            catch { }
        }
        Process cmd = new Process();
        RTLSEntities ctx = new RTLSEntities();
        private void Form1_Load(object sender, EventArgs e)
        {
            this.Size = new Size(136, 141);
            this.Opacity = 0;
            int h = Screen.PrimaryScreen.WorkingArea.Height - 141;
            int w = Screen.PrimaryScreen.WorkingArea.Width - 136;
            this.Location = new Point(w, h);

            cmd.StartInfo.FileName = "cmd.exe";
            cmd.StartInfo.RedirectStandardInput = true;
            cmd.StartInfo.RedirectStandardOutput = true;
            cmd.StartInfo.RedirectStandardError = true;
            cmd.StartInfo.CreateNoWindow = true;
            cmd.StartInfo.UseShellExecute = false;
            cmd.OutputDataReceived += new DataReceivedEventHandler(OnOutputDataReceived);
            cmd.ErrorDataReceived += new DataReceivedEventHandler(OnOutputDataReceived);
            cmd.Start();

            cmd.BeginErrorReadLine();
            cmd.BeginOutputReadLine();
            webBrowser1.ScriptErrorsSuppressed = true;

            StartStop = 1;
            basla();
        }
        public void p_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            if (e.Data != null)
            {
                textLog(e.Data);
            }
        }
        void OnOutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            textLog(e.Data);
            textData(1);
        }
        private void start_Click(object sender, EventArgs e)
        {
            StartStop = 1;
            basla();
        }
        public void basla()
        {
            button2.Visible = true;
            button1.Visible = false;
            cmd.StandardInput.WriteLine("c:");
            cmd.StandardInput.Flush();
            cmd.StandardInput.WriteLine(@"cd\");
            cmd.StandardInput.Flush();
            cmd.StandardInput.WriteLine(@"cd C:\Windows");
            cmd.StandardInput.Flush();
            cmd.StandardInput.WriteLine("node ws_min.js");
            cmd.StandardInput.Flush();
            step = 0;
            webBrowser1.Navigate("http://10.10.60.200:8003/rtls.html");
        }
        int StartStop = 0;
        private void button2_Click(object sender, EventArgs e)
        {
            timer1.Stop();
            cikis();
        }
        public void cikis()
        {
            button2.Visible = false;
            button1.Visible = true;
            Process[] processlist = Process.GetProcesses();

            foreach (Process theprocess in processlist)
            {
                if (theprocess.ProcessName == "node")
                {
                    theprocess.Kill();
                }
            }
        }

        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            cikis();
        }
        private void webBrowser1_Navigated(object sender, WebBrowserNavigatedEventArgs e)
        {
            webBrowser1.ScriptErrorsSuppressed = true;
        }
        private void webBrowser1_Navigating(object sender, WebBrowserNavigatingEventArgs e)
        {
            webBrowser1.ScriptErrorsSuppressed = true;
        }
        int step = 0;
        private void webBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            if (step == 0)
            {
                webBrowser1.Navigate("about:blank");
                step = 1;
            }
        }
        private void timer1_Tick(object sender, EventArgs e)
        {
            textData(0);
            timer1.Stop();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            cikis();
        }
        int formDurum = 0;
        private void Form1_DoubleClick(object sender, EventArgs e)
        {
            if (formDurum == 0)
            {
                this.Size = new Size(506, 295);
                formDurum = 1;
            }
            else
            {
                this.Size = new Size(136, 141);
                formDurum = 0;
            }
        }

        private void çıkışToolStripMenuItem_Click(object sender, EventArgs e)
        {
            cikis();
            Application.Exit();
        }

        private void baslatToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Opacity = 1;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.Size = new Size(136, 141);
            formDurum = 0;
            int h = Screen.PrimaryScreen.WorkingArea.Height - 141;
            int w = Screen.PrimaryScreen.WorkingArea.Width - 136;
            this.Location = new Point(w, h);
            this.Opacity = 0;
        }
    }
}
