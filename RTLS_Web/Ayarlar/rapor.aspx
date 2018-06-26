<%@ Page Title="" Language="C#" MasterPageFile="~/Ayarlar/sablon.Master" AutoEventWireup="true" CodeBehind="rapor.aspx.cs" Inherits="RTLS_Web.Ayarlar.rapor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-3" style="margin-top:15px; margin-bottom:30px;">
                <h3>Rapor</h3>
            </div>
            <div class="col-md-3">
                <label>Tarih 1</label>
                <asp:TextBox ID="tarih1" runat="server" CssClass="form-control" TextMode="Date" AutoPostBack="True"></asp:TextBox>
            </div>
            <div class="col-md-3">
                <label>Tarih 2</label>
                <asp:TextBox ID="tarih2" runat="server" CssClass="form-control" TextMode="Date" AutoPostBack="True"></asp:TextBox>
            </div>
            <div class="col-md-3">
                <label>Firma</label>
                <asp:DropDownList ID="Firma_ID" CssClass="form-control" runat="server" AutoPostBack="True"></asp:DropDownList>
            </div>
            
            <div class="col-md-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Ad Soyad</th>
                            <th scope="col">Tarih</th>
                            <th scope="col">Departman<br />Gorev</th>
                            <th scope="col">Firma</th>
                            <th scope="col">Konum</th>
                            <th scope="col">Toplam Zaman</th>
                        </tr>
                    </thead>
                    <tbody>
                        <asp:Repeater ID="RList" runat="server">
                            <ItemTemplate>
                                <tr>
                                    <td><a href="/personelRoot.aspx?p_ID=<%#Eval("personelID") %>&h_ID=<%#Eval("haritaID") %>&tarih=<%#Eval("Tarih", "{0:d}")%>" target="_blank"><i class="fas fa-street-view"></i></a></td>
                                    <td><%#Eval("Personel") %>(<%#Eval("TagNo") %>)</td>
                                    <td><%#Eval("Tarih", "{0:d}")%></td>
                                    <td><%#Eval("Departman") %><br /><%#Eval("Gorev") %></td>
                                    <td><%#Eval("Firma") %></td>
                                    <td><%#Eval("Konum") %></td>
                                    <td><%#snZaman((int)Eval("ToplamZaman")) %></td>
                                </tr>
                            </ItemTemplate>
                        </asp:Repeater>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</asp:Content>
