<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="Zone_Edit.aspx.cs" Inherits="RTLS_Web.Ayarlar.Zone_Edit" %>
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
                        <li class="breadcrumb-item"><a href="Zone.aspx?MapID=<%=Request.QueryString["MapID"] %>&HaritaID=<%=Request.QueryString["HaritaID"] %>">Zon</a></li>
                        <li class="breadcrumb-item active">Ekle</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3>Zon Ekle</h3>
                    </div>
                    <div class="col-md-12">
                        <label>Zon Adı</label>
                        <asp:TextBox ID="BolgeAdi" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-6">
                        <label>Anchor 1 ID</label>
                        <asp:TextBox ID="Anchor1_ID" TextMode="Number" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-4">
                        <label>İp</label>
                        <asp:TextBox ID="Anchor1_Ip" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-2">
                        <label>Yükseklik (Cm)</label>
                        <asp:TextBox ID="Anchor1_Z" CssClass="form-control" runat="server" TextMode="Number"></asp:TextBox>
                    </div>

                    <div class="col-md-6">
                        <label>Anchor 2 ID</label>
                        <asp:TextBox ID="Anchor2_ID" TextMode="Number" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-4">
                        <label>İp</label>
                        <asp:TextBox ID="Anchor2_Ip" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-2">
                        <label>Yükseklik (Cm)</label>
                        <asp:TextBox ID="Anchor2_Z" CssClass="form-control" runat="server" TextMode="Number"></asp:TextBox>
                    </div>

                    <div class="col-md-6">
                        <label>Anchor 3 ID</label>
                        <asp:TextBox ID="Anchor3_ID" TextMode="Number" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-4">
                        <label>İp</label>
                        <asp:TextBox ID="Anchor3_Ip" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-2">
                        <label>Yükseklik (Cm)</label>
                        <asp:TextBox ID="Anchor3_Z" CssClass="form-control" runat="server" TextMode="Number" ></asp:TextBox>
                    </div>

                    <div class="col-md-6">
                        <label>Anchor Master ID</label>
                        <asp:TextBox ID="AnchorMaster_ID" TextMode="Number" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    <div class="col-md-6">
                        <label>İp</label>
                        <asp:TextBox ID="AnchorMaster_Ip" CssClass="form-control" runat="server"></asp:TextBox>
                    </div>
                    
                    <div class="col-md-12" style="margin-top:15px;">
                        <asp:Button ID="Kaydet" runat="server" Text="Kaydet" CssClass="btn btn-primary fa-pull-right" OnClick="Kaydet_Click" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
