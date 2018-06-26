<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="harita_Edit.aspx.cs" Inherits="RTLS_Web.Ayarlar.harita_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="map.aspx">Bölgeler</a></li>
                        <li class="breadcrumb-item"><a href="harita.aspx?MapID=<%=Request.QueryString["MapID"] %>">Harita</a></li>
                        <li class="breadcrumb-item active">Düzenle</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3>Harita Düzenle</h3>
                    </div>
                    <div class="col-md-9">
                        <label>Harita Adı</label>
                        <asp:TextBox ID="HaritaAdi" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-3">
                        <label>Harita Oranı</label>
                        <asp:TextBox ID="Oran" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-12">
                        <label>Harita Resmi</label>
                        <div class="input-group mb-2">
                            <asp:FileUpload ID="FileUpload1" runat="server" CssClass="form-control" />
                            <%=imgKontrol() %>
                        </div>
                    </div>
                    <div class="col-md-12" style="margin-top: 15px;">
                        <asp:Button ID="Kaydet" runat="server" Text="Kaydet" CssClass="btn btn-primary fa-pull-right" OnClick="Kaydet_Click" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
