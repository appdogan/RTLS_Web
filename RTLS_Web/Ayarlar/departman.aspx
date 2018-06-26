<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="departman.aspx.cs" Inherits="RTLS_Web.Ayarlar.departman" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">

            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3>Departman Tanımları
                    <button type="button" class="btn btn-success fa-pull-right" onclick="departman(0,'')">Ekle</button></h3>
                    </div>

                    <table class="table2 table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 100%">Departman</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <asp:Repeater ID="RList" runat="server">
                                <ItemTemplate>
                                    <tr>
                                        <td><a href="departman.aspx?DID=<%#Eval("ID") %>"><%#Eval("Departman") %></a></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-primary" onclick="departman(<%#Eval("ID") %>,'<%#Eval("Departman") %>')">Düzenle</button></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-danger" onclick="if (confirm('Kaydı silmek istediğinizden eminmisiniz?')){parent.location='departman.aspx?dlt=<%#Eval("ID") %>';}">Sil</button></td>
                                    </tr>
                                </ItemTemplate>
                            </asp:Repeater>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px; margin-bottom: 15px;">
                        <h3>Görev Tanımları
                    <button type="button" class="btn btn-success fa-pull-right" onclick="gorev(0,'');" id="gorevekle" runat="server">Ekle</button></h3>
                    </div>

                    <table class="table2 table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 100%" id="gorevBaslik" runat="server">Görevler</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <asp:Repeater ID="RListG" runat="server">
                                <ItemTemplate>
                                    <tr>
                                        <td><%#Eval("Gorev") %></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-primary" onclick="gorev(<%#Eval("ID") %>,'<%#Eval("Gorev") %>')">Düzenle</button></td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-danger" onclick="if (confirm('Kaydı silmek istediğinizden eminmisiniz?')){parent.location='departman.aspx?dltG=<%#Eval("ID") %>&DID=<%#Eval("Departman_ID") %>';}">Sil</button></td>
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
        function departman(id,name) {
            var departman = window.prompt('Departman Adı',name);
            if (departman != null) {
                if (id == 0) {
                    parent.location = 'departman.aspx?id=0&d=departman&name=' + departman;
                } else {
                    parent.location = 'departman.aspx?id=' + id +'&d=departman&name=' + departman;
                }
            }
        }
        function gorev(id,name) {
            var gorev = window.prompt('Görev Adı',name);
            if (gorev != null) {
                if (id == 0) {
                    parent.location = 'departman.aspx?id=0&DID=<%=Request.QueryString["DID"]%>&d=gorev&name=' + gorev;
                } else {
                    parent.location = 'departman.aspx?id=' + id + '&DID=<%=Request.QueryString["DID"]%>&d=gorev&name=' + gorev;
                }
            }
        }
    </script>
</asp:Content>
