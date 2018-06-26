<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="harita.aspx.cs" Inherits="RTLS_Web.Ayarlar.harita1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="map.aspx">Bölgeler</a></li>
                        <li class="breadcrumb-item active">Harita</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3><span id="baslik" runat="server">Haritalar</span>
                    <button type="button" class="btn btn-success fa-pull-right" onclick="parent.location='harita_Add.aspx?MapID=<%=Request.QueryString["MapID"] %>'">Ekle</button></h3>
                    </div>

                    <table class="table table-hover">
                        <tbody>
                            <asp:Repeater ID="RList" runat="server">
                                <ItemTemplate>
                                    <tr>
                                        <td style="width:100%"><a href="Zone.aspx?MapID=<%#Eval("Map_ID") %>&HaritaID=<%#Eval("ID") %>"><%#Eval("HaritaAdi") %></a></td>
                                        <td><%# imgKontrol((int)Eval("ID")) %></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-primary" onclick="parent.location='harita_Edit.aspx?ID=<%#Eval("ID") %>&MapID=<%=Request.QueryString["MapID"] %>'">Düzenle</button></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-danger" onclick="if (confirm('Kaydı silmek istediğinizden eminmisiniz?')){parent.location='harita.aspx?dlt=<%#Eval("ID") %>&MapID=<%#Eval("Map_ID") %>';}">Sil</button></td>
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
