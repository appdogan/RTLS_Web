<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="firma.aspx.cs" Inherits="RTLS_Web.Ayarlar.firma" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3>Firma Tanımları
                    <button type="button" class="btn btn-success fa-pull-right" onclick="firma(0,'')">Ekle</button></h3>
                    </div>

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 100%">Firmalar</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <asp:Repeater ID="RList" runat="server">
                                <ItemTemplate>
                                    <tr>
                                        <td><a href="firma.aspx?DID=<%#Eval("ID") %>"><%#Eval("Firma") %></a></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-primary" onclick="firma(<%#Eval("ID") %>,'<%#Eval("firma") %>')">Düzenle</button></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-danger" onclick="if (confirm('Kaydı silmek istediğinizden eminmisiniz?')){parent.location='firma.aspx?dlt=<%#Eval("ID") %>';}">Sil</button></td>
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
        function firma(id,name) {
            var f = window.prompt('Firma Adı',name);
            if (f != null) {
                if (id == 0) {
                    parent.location = 'firma.aspx?id=0&d=firma&name=' + f;
                } else {
                    parent.location = 'firma.aspx?id=' + id +'&d=firma&name=' + f;
                }
            }
        }
    </script>
</asp:Content>