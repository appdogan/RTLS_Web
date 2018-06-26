<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="log.aspx.cs" Inherits="RTLS_Web.Ayarlar.log" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="http://192.168.1.66:3000/socket.io/socket.io.js"></script>
    <script>
        var socket = io.connect("http://192.168.1.66:3000");
        socket.on("mesajgitti", function (data) {
            var log = $('#log').val();
            var dizi = log.split('\n');
            if (dizi.length > 20) {
                var html = '';
                for (i = 1; i < dizi.length; i++) {
                    if (i == 1) {
                        html += dizi[i];
                    } else {
                        html += '\n' + dizi[i];
                    }
                }
                log = html;
            }
            $('#log').val(log + '\n' + data);
            $('#log').scrollTop($('#log')[0].scrollHeight);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12" style="margin-top:15px; margin-bottom:15px;">
                <h3>Log</h3>
            </div>
            <div class="col-md-12">
                <textarea id="log" rows="8" class="form-control"></textarea>
            </div>
        </div>
    </div>

</asp:Content>
