var aksiyon_t;
var aksiyon_adet=0;
$(function () {
    $('.Tabs').html('<li onclick="parent.location=\'index.html\'"><i class="fas fa-home"></i></li><li onclick="map(1)" class="mapDegistir"><i class="far fa-map"></i></li>');

    $('#durumTab button').click(function () {
        TabloYukle($(this).attr('durum'));
    });
    $('#durumTab button').eq(0).click();

    $('#GorevEkle').click(function () {
        $('.modal-dialog').addClass('modal-lg');
        $('#exampleModalLong').modal('show');
        $('.modal-title').html('Yeni Görev');

        $('.modal-body').load('/Content/forms/Gorev.html', function () {
            var today = new Date();
            $("#FormGorev #BaslangicTarihi").val(today.getFullYear().toString() + '-' + cift(today.getMonth() + 1) + '-' + cift(today.getDate().toString()));
            $("#FormGorev #Id").val(0);
            $.ajax({
                type: "GET",
                dataType: "json",
                url: 'Servis.aspx?Servis=PersonelList',
                success: function (data) {
                    oran = parseInt($('#oran').val());
                    Personel = data;
                    var html = '';
                    html += '<option value="0">-- Seçiniz --</option>';
                    $.each(data, function (name, value) {
                        html += '<option value="' + value.ID + '">' + value.Ad + ' ' + value.Soyad + '</option>';
                    });
                    $('#FormGorev #personel_ID').html(html);
                },
                error: function () {
                    Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                }
            });
            $('#FormGorev #personel_ID').html();
        });
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: '/Servis.aspx?Servis=Aksiyon&tur=1',
        success: function (data) {
            var html = '';
            $.each(data, function (name, value) {
                html += '<li id="aksiyon_' + value.ID + '">' + value.Aciklama + '</li>';
            });
            $('#Aksiyon ul').html(html);
            $('#Aksiyon span').html($('#Aksiyon ul li').length);
        }
    });
    aksiyon_t = setInterval(function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: '/Servis.aspx?Servis=Aksiyon&tur=2',
            success: function (data) {
                var html = '';
                $.each(data, function (name, value) {
                    html += '<div class="AksiyonBlok" style="bottom:' + ((aksiyon_adet * 10) + 20) + 'px"><img class="AksiyonResim" src="data:image/jpeg;base64,' + value.Resim + '"><span>' + value.Zaman + '<br />' + value.Aciklama + '</span><i class="fas fa-times AksiyonBlokKapat"></i></div>';
                    aksiyon_adet++;
                    if ($('#Aksiyon ul #aksiyon_' + value.ID).length == 0) {
                        $('#Aksiyon ul').append('<li id="aksiyon_' + value.ID + '">' + value.Aciklama + '</li>');
                    }
                });
                $('body').append(html);
                $('#Aksiyon span').html($('#Aksiyon ul li').length);
                $('.AksiyonBlokKapat').click(function () {
                    aksiyon_adet--;
                    if (aksiyon_adet < 0) { aksiyon_adet = 0;}
                    $(this).parent().remove();
                });
            }
        });
    }, 8000);
});
function TabloYukle(q) {
    $('#GorevListesi').html('');
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=GorevListesi&q=' + q,
        success: function (data) {
            var html = '';
            var durum0;
            var durum1;
            var durum2;
            var durum3;

            html += '<table class="table table-striped table-bordered">';
            html += '<thead>';
            html += '<tr>';
            html += '<th style="width:10px"></th>';
            html += '<th>Başlangıç Tarihi</th>';
            html += '<th>Bitiş Tarihi</th>';
            html += '<th>Görev</th>';
            html += '<th>Personel</th>';
            html += '<th style="width:150px">Durum</th>';
            html += '<th style="width:10px"></th>';

            html += '<th style="width:20px"></th>';
            html += '<th style="width:20px"></th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            $.each(data, function (name, value) {
                durum0 = '';
                durum1 = '';
                durum2 = '';
                durum3 = '';

                durum0 = '';
                durum1 = '';
                durum2 = '';
                durum3 = '';

                if (value.Durum == 0) {
                    durum0 = 'selected';
                } else if (value.Durum == 1) {
                    durum1 = 'selected';
                } else if (value.Durum == 2) {
                    durum2 = 'selected';
                } else if (value.Durum == 3) {
                    durum3 = 'selected';
                }
                html += '<tr id="' + value.ID + '" class="' + durumFormat(value.Durum) + '">';
                html += '<th><span class="adet">' + value.adet + '<span></th>';
                html += '<th>' + TarihFormat(value.BaslangicTarihi) + '</th>';
                html += '<th>' + TarihFormat(value.BitisTarihi) + '</th>';
                html += '<th>' + value.GorevBasligi + '</th>';
                html += '<th>' + value.Personel + '</th>';
                html += '<th>';
                html += '<select class="form-control-sm Durum" durumid="' + value.ID + '">';
                html += '<option value="0" ' + durum0 + '>Beklemede</option>';
                html += '<option value="1" ' + durum1 + '>Devam Ediyor</option>';
                html += '<option value="2" ' + durum2 + '>Tamamlandı</option>';
                html += '<option value="3" ' + durum3 + '>İptal Edildi</option>';
                html += '</option>';
                html += '</select>';
                html += '</th>';
                html += '<th><i class="far fa-comment-alt aciklama" aciklama="' + value.Aciklama + '"></i></th>';

                html += '<th><span class="btn btn-info btn-sm duzenle"><i class="fas fa-pencil-alt mr-2"></i>Düzenle</span></th>';
                html += '<th><span class="btn btn-danger btn-sm sil"><i class="fas fa-times mr-2"></i>Sil</span></th>';
                html += '</tr>';
            });
            html += '</tbody > ';
            html += '</table>';

            $('#GorevListesi').html(html);

            $('.aciklama').click(function () {
                $('.modal-dialog').removeClass('modal-lg');
                $('#exampleModalLong').modal('show');
                $('.modal-title').html('Görev Notu');
                var id = $(this).parent().parent().attr('id');
                html = '<div><p>' + replaceAll($(this).attr('aciklama'), '\n', '</br >') + '</p></div>';
                $('.modal-body').html(html);
            });
            $('.Durum').change(function () {
                var id = $(this).attr('durumid');
                var durum = $(this).val();
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: 'Servis.aspx?Servis=GorevDurum&id=' + id + '&durum=' + durum,
                    success: function (data) {
                        $('#GorevListesi #' + id).removeClass('table-success');
                        $('#GorevListesi #' + id).removeClass('table-info');
                        $('#GorevListesi #' + id).removeClass('table-danger');
                        $('#GorevListesi #' + id).addClass(durumFormat(durum));
                        OK('Durum bilgisi değiştirildi');
                    },
                    error: function () {
                        Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                    }
                });
            });
            var table = $('#GorevListesi table').DataTable({
                "paging": true,
                "ordering": true,
                "info": true,
                "responsive": true,
                "stateSave": true
            });
            $('#GorevListesi table tbody').on('click', '.adet', function () {
                var $target = $('body');
                //$('.altTablo').parent().parent().hide('slow');
                var id = $(this).parent().parent().attr('id');
                var tr = $(this).closest('tr');
                var row = table.row(tr);

                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    var html = '';
                    html += '<table class="altTablo" cellpadding="5" cellspacing="0" border="0" >';
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: 'Servis.aspx?Servis=GorevIslem&id=' + id,
                        success: function (data) {
                            $.each(data, function (name, value) {
                                html += '<tr id0="' + value.ID + '" gorev_id="' + value.Gorev_ID + '">';
                                html += '<td class="balon" title="<img src=\'/Content/Data/Gorev/' + value.ID + '.jpg?q=' + Math.random() + '\'>"><i class="far fa-images"></i></td>';
                                html += '<td>' + Durum(value.Durum) + '</td>';
                                html += '<td>' + value.Zaman + '</td>';
                                html += '<td>' + value.Aciklama + '</td>';
                                html += '<td style="display:none"><span class="btn btn-info btn-sm duzenle0"><i class="fas fa-pencil-alt mr-2"></i>Düzenle</span></td>';
                                html += '<td><span class="btn btn-danger btn-sm sil0"><i class="fas fa-times mr-2"></i>Sil</span></td>';
                                html += '</tr>';
                            });
                            html += '</table>';
                            row.child(html).show();

                            $('.sil0').click(function () {
                                var id = $(this).parent().parent().attr('id0');
                                var gorev_id = $(this).parent().parent().attr('gorev_id');
                                var hedef = $(this).parent().parent();
                                if (confirm('Bu kaydı silmek istediğinizden eminmisiniz?')) {
                                    $.ajax({
                                        type: "GET",
                                        dataType: "json",
                                        url: 'Servis.aspx?Servis=GorevSil&ID=' + id + '&tur=GorevPersonel',
                                        success: function (data) {
                                            var obj = jQuery.parseJSON(JSON.stringify(data));
                                            if (obj.durum == 1) {
                                                hedef.remove();

                                                $('#' + gorev_id + ' .adet').html(hedef.find('.balon').length);
                                            } else {
                                                Hata(obj.hata);
                                            }
                                        }
                                    });
                                }
                            });

                            $('body').scrollTo('#' + id);
                            Balon();
                        },
                        error: function () {
                            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                        }
                    });
                    tr.addClass('shown');
                }
            });
            $('.duzenle').click(function () {
                var id = $(this).parent().parent().attr('id');
                $('.modal-dialog').addClass('modal-lg');
                $('#exampleModalLong').modal('show');
                $('.modal-title').html('Görev Düzenle');

                $('.modal-body').load('/Content/forms/Gorev.html', function () {

                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: 'Servis.aspx?Servis=PersonelList',
                        success: function (data) {
                            oran = parseInt($('#oran').val());
                            Personel = data;
                            var html = '';
                            html += '<option value="0">-- Seçiniz --</option>';
                            $.each(data, function (name, value) {
                                html += '<option value="' + value.ID + '">' + value.Ad + ' ' + value.Soyad + '</option>';
                            });
                            $('#FormGorev #personel_ID').html(html);

                            $.ajax({
                                type: "GET",
                                dataType: "json",
                                url: 'Servis.aspx?Servis=GorevGetir&ID=' + id,
                                success: function (data) {

                                    var obj = jQuery.parseJSON(JSON.stringify(data));

                                    var d1 = new Date(obj.BaslangicTarihi);
                                    var d2 = new Date(obj.BitisTarihi);

                                    $('#FormGorev #personel_ID').val(obj.Personel_ID);
                                    $('#FormGorev #GorevBasligi').val(obj.GorevBasligi);
                                    if (obj.BaslangicTarihi != '1900-01-01T00:00:00') {
                                        $('#FormGorev #BaslangicTarihi').val(d1.getFullYear().toString() + '-' + cift(d1.getMonth() + 1) + '-' + cift(d1.getDate().toString()));
                                    }
                                    if (obj.BitisTarihi != '1900-01-01T00:00:00') {
                                        $('#FormGorev #BitisTarihi').val(d2.getFullYear().toString() + '-' + cift(d2.getMonth() + 1) + '-' + cift(d2.getDate().toString()));
                                    }
                                    $('#FormGorev #Aciklama').val(obj.Aciklama);
                                    $('#FormGorev #Durum').val(obj.Durum);
                                    $("#FormGorev #Id").val(obj.ID);
                                }
                            });

                        },
                        error: function () {
                            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                        }
                    });

                });
            });
            $('.sil').click(function () {
                var id = $(this).parent().parent().attr('id');
                if (confirm('Bu kaydı silmek istediğinizden eminmisiniz?')) {
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: 'Servis.aspx?Servis=GorevSil&ID=' + id + '&tur=Gorevler',
                        success: function (data) {
                            var obj = jQuery.parseJSON(JSON.stringify(data));
                            if (obj.durum == 1) {
                                $('#GorevListesi #' + id).hide('slow');

                            } else {
                                Hata(obj.hata);
                            }
                        }
                    });
                }
            });
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
}
function Durum(i) {
    if (i == 0) {
        return 'Beklemede';
    } else if (i == 1) {
        return 'Devam Ediyor';
    } else if (i == 2) {
        return 'Tamamlandı';
    } else {
        return 'İptal Edildi';
    }
}
function TarihFormat(tarih) {
    if (tarih == '1900-01-01T00:00:00') {
        return '-';
    } else {
        var d = new Date(tarih);
        return cift(d.getDate()) + '.' + cift(d.getMonth() + 1) + '.' + d.getFullYear();
    }
}
function FormGorev_kaydet() {
    Yukleniyor(1);
    var res = $("#FormGorev").serialize();

    $.ajax({
        type: "POST",
        dataType: "json",
        data: res,
        url: '/Servis.aspx?Servis=GorevKaydet&id=' + $("#FormGorev #Id").val(),
        success: function (data) {
            Yukleniyor(0);
            var obj = jQuery.parseJSON(JSON.stringify(data));
            if (obj.durum == 1) {
                $('#exampleModalLong').modal('hide');
                TabloYukle($('#durumTab .active').attr('durum'));
            } else {
                Hata(obj.hata);
            }
        },
        error: function () {
            Yukleniyor(0);
            Hata("Hata oluştu. Lütfen tekrar deneyiniz", "");
            $('#exampleModalLong').modal('hide');
        }
    });
}
function durumFormat(d) {
    if (d == 0) {
        return '';
    } else if (d == 1) {
        return 'table-success';
    } else if (d == 2) {
        return 'table-info';
    } else if (d == 3) {
        return 'table-danger';
    }
}
function format(id) {
    var html = '';
    html += '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=GorevIslem&id=' + id,
        success: function (data) {
            $.each(data, function (name, value) {
                html += '<tr>';
                html += '<td><i class="far fa-images"></i></td>';
                html += '<td>' + Durum(value.Durum) + '</td>';
                html += '<td>' + value.Zaman + '</td>';
                html += '<td>' + value.Aciklama + '</td>';
                html += '</tr>';
            });
            html += '</table>';
            return html;
        },
        error: function () {
            return '';
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });

}
function Balon() {
    $('.balon').mouseover(function () {
        var data = $(this).attr('title');
        $(this).append('<div class="balonTooltip">' + data + '</div>');
    }).mouseout(function () {
        $('.balonTooltip').remove();
    });
}

