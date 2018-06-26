<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="Zone.aspx.cs" Inherits="RTLS_Web.Ayarlar.Anchor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="map.aspx">Bölgeler</a></li>
                        <li class="breadcrumb-item"><a href="harita.aspx?MapID=<%=Request.QueryString["MapID"] %>">Haritalar</a></li>
                        <li class="breadcrumb-item active">Zon</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3><span id="baslik" runat="server"></span>
                    <button type="button" class="btn btn-success fa-pull-right" onclick="parent.location='Zone_Add.aspx?MapID=<%=Request.QueryString["MapID"] %>&HaritaID=<%=Request.QueryString["HaritaID"] %>'">Ekle</button></h3>
                    </div>
                    <table class="table table-hover">
                        <tbody>
                            <asp:Repeater ID="RList" runat="server">
                                <ItemTemplate>
                                    <tr>
                                        <td style="width:100%"><%#Eval("BolgeAdi") %></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-primary" onclick="parent.location='Zone_Edit.aspx?ID=<%#Eval("ID") %>&MapID=<%=Request.QueryString["MapID"] %>&HaritaID=<%=Request.QueryString["HaritaID"] %>'">Düzenle</button></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-danger" onclick="if (confirm('Kaydı silmek istediğinizden eminmisiniz?')){parent.location='Zone.aspx?dlt=<%#Eval("ID") %>&MapID=<%=Request.QueryString["MapID"] %>&HaritaID=<%#Eval("Harita_ID") %>';}">Sil</button></td>
                                    </tr>
                                </ItemTemplate>
                            </asp:Repeater>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
