<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="personel_edit.aspx.cs" Inherits="RTLS_Web.Ayarlar.personel_edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                <h3>Personel Düzenle</h3>
            </div>
            <div class="col-md-6">
                <label>Ad</label>
                <asp:TextBox ID="Ad" CssClass="form-control" runat="server"></asp:TextBox>
            </div>
            <div class="col-md-6">
                <label>Soyad</label>
                <asp:TextBox ID="Soyad" CssClass="form-control" runat="server"></asp:TextBox>
            </div>
            <div class="col-md-6">
                <label>Tag No</label>
                <asp:TextBox ID="TagNo" CssClass="form-control" runat="server"></asp:TextBox>
            </div>
            <div class="col-md-6">
                <label>Tag Tipi</label>
                <asp:DropDownList ID="TagTipi" CssClass="form-control" runat="server"></asp:DropDownList>
            </div>
            <div class="col-md-6">
                <label>Departman</label>
                <asp:DropDownList ID="Departman_ID" CssClass="form-control" runat="server" AutoPostBack="True" OnSelectedIndexChanged="Departman_ID_SelectedIndexChanged"></asp:DropDownList>
            </div>
            <div class="col-md-6">
                <label>Görev</label>
                <asp:DropDownList ID="Gorev_ID" CssClass="form-control" runat="server"></asp:DropDownList>
            </div>
            <div class="col-md-6">
                <label>Firma</label>
                <asp:DropDownList ID="Firma_ID" CssClass="form-control" runat="server"></asp:DropDownList>
            </div>
            <div class="col-md-6">
                <label>Kamera Ip</label>
                <asp:TextBox ID="KamraIp" CssClass="form-control" runat="server"></asp:TextBox>
            </div>
            <div class="col-md-12">
                <label>Not</label>
                <asp:TextBox ID="Aciklama" TextMode="MultiLine" Rows="4" CssClass="form-control" runat="server"></asp:TextBox>
            </div>
            <div class="col-md-12" style="margin-top: 15px;">
                <asp:Button ID="Kaydet" runat="server" CssClass="btn btn-primary fa-pull-right" Text="Kaydet" OnClick="Kaydet_Click" />
                <button type="button" class="btn btn-outline-info fa-pull-right" style="margin-right: 15px;" onclick="history.go(-1)">Geri</button>
            </div>
        </div>
    </div>
</asp:Content>
