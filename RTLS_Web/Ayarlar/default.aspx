<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="RTLS_Web.Ayarlar._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>RTLS Yönetim</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/login.css" rel="stylesheet" />
</head>
<body class="text-center">
    <form id="form1" runat="server" class="form-signin" >
        <img class="mb-4" src="/Content/img/Globax_Logo.png" alt="Globax">
        <asp:Panel ID="Panel1" runat="server">
            <div class="alert alert-danger" role="alert">
                Hatalı şifre
            </div>
        </asp:Panel>
        <label for="inputPassword" class="sr-only">Şifre</label>
        <div class="input-group">
        <asp:TextBox ID="inputPassword" runat="server" CssClass="form-control" TextMode="Password" ></asp:TextBox>
</div>
        <asp:Button ID="Giris" CssClass="btn btn-lg btn-primary btn-block" runat="server" Text="Giriş" OnClick="Giris_Click" />
    </form>
    <script src="js/jquery-3.2.1.slim.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
</body>
</html>
