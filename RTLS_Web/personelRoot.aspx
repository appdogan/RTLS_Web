<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="personelRoot.aspx.cs" Inherits="RTLS_Web.personelRoot" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <title>RTLS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/Content/css/jquery-ui.min.css" rel="stylesheet" />
    <script src="/Content/js/jquery-3.3.1.min.js"></script>
    <script src="/Content/js/jquery-ui.min.js"></script>
    <link href="/Content/css/fontawesome-all.min.css" rel="stylesheet" />
    <link href="/Content/css/main.css" rel="stylesheet" />
    <link href="/Content/css/style.css" rel="stylesheet" />
    <script src="/Content/js/rotate.js"></script>
    <script src="/Content/js/jquery.scrollTo.min.js"></script>
    <link href="/Content/css/personelRoot.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="icerik">
            <div class="kisi">
                <div class="saat"></div>
            </div>
            <canvas id="canvas" width="800" height="600"></canvas>
        </div>
    </form>

    <div class="slider">
        <div id="slider"></div>
    </div>
    <ul class="kadran"></ul>
    <img id="zemin" src="/Content/Data/Map/<%=Request.QueryString["h_ID"] %>.jpg?q=<%=rndSayi()%>" style="display: none" />
    <img src="/Content/img/Globax_Logo.png" id="Globax_Logo" />
    <button type="button" class="zoom zoomPlus">+</button>
    <button type="button" class="zoom zoomMin">-</button>
    <button type="button" class="zoom rotateL"><i class="fas fa-redo-alt"></i></button>
    <button type="button" class="zoom rotateR"><i class="fas fa-redo-alt"></i></button>
    <button type="button" class="zoom default"><i class="fas fa-crosshairs"></i></button>
    <div id="veri" runat="server" style="display: none;"></div>
    <div id="oran" runat="server" style="display: none;"></div>
</body>
<script src="/Content/js/personelRoot.js"></script>
</html>
