<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="personel.aspx.cs" Inherits="RTLS_Web.Ayarlar.personel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-12" style="margin-top:15px; margin-bottom:15px;">
                <h3>Personel Ayarları
                    <button type="button" class="btn btn-success fa-pull-right" onclick="parent.location='personel_add.aspx'">Ekle</button></h3>
            </div>
            <div class="col-md-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Ad Soyad</th>
                            <th scope="col">Tag No</th>
                            <th scope="col">Tag Tipi</th>
                            <th scope="col">Departman</th>
                            <th scope="col">Görev</th>
                            <th scope="col">Firma</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <asp:Repeater ID="RList" runat="server">
                            <ItemTemplate>
                                <tr>
                                    <td><%#Eval("Ad") + " " + Eval("Soyad") %></td>
                                    <td><%#Eval("TagNo") %></td>
                                    <td><i class="fas <%#Eval("TagTipi") %>"></i></td>
                                    <td><%#Eval("Departman") %></td>
                                    <td><%#Eval("Gorev") %></td>
                                    <td><%#Eval("Firma") %></td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-primary" onclick="parent.location='personel_edit.aspx?id=<%#Eval("ID") %>'">Düzenle</button></td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-danger" onclick="if (confirm('Kaydı silmek istediğinizden eminmisiniz?')){parent.location='personel.aspx?dlt=<%#Eval("ID") %>';}">Sil</button></td>
                                </tr>
                            </ItemTemplate>
                        </asp:Repeater>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</asp:Content>
