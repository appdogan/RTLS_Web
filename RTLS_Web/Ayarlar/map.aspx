<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="map.aspx.cs" Inherits="RTLS_Web.Ayarlar.harita" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active">Bölgeler</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3>Bölgeler
                    <button type="button" class="btn btn-success fa-pull-right" onclick="map(0,'')">Ekle</button></h3>
                    </div>

                    <table class="table table-hover">
                        <tbody>
                            <asp:Repeater ID="RList" runat="server">
                                <ItemTemplate>
                                    <tr>
                                        <td style="width:100%"><a href="harita.aspx?MapID=<%#Eval("ID") %>"><%#Eval("map") %></a></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-primary" onclick="map(<%#Eval("ID") %>,'<%#Eval("map") %>')">Düzenle</button></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-danger" onclick="if (confirm('Kaydı silmek istediğinizden eminmisiniz?')){parent.location='map.aspx?dlt=<%#Eval("ID") %>';}">Sil</button></td>
                                    </tr>
                                </ItemTemplate>
                            </asp:Repeater>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script>
        function map(id, name) {
            var bolge = window.prompt('Bölge Adı', name);
            if (bolge != null) {
                if (id == 0) {
                    parent.location = 'map.aspx?id=0&d=map&name=' + bolge;
                } else {
                    parent.location = 'map.aspx?id=' + id + '&d=map&name=' + bolge;
                }
            }
        }
    </script>
</asp:Content>
