$(document).ready(function () {

    var modal = '<div class="modal fade" id="modalPersonelAdim" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" >';
    modal += '<div class="modal-dialog modal-dialog-centered" role="document">';
    modal += '<div class="modal-content">';
    modal += '<div class="modal-header">';
    modal += '<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>';
    modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    modal += '<span aria-hidden="true">&times;</span>';
    modal += '</button>';
    modal += '</div>';
    modal += '<div class="modal-body">';
    modal += '<form id="modalForm"></form>';
    modal += '</div>';
    modal += '</div>';
    modal += '</div>';
    modal += '</div>';
    $('body').append(modal);

    $('.Tabs').html('<li onclick="parent.location=\'index.html\'"><i class="fas fa-home"></i></li><li onclick="map(1)" class="mapDegistir"><i class="far fa-map"></i></li>');
    Personel();
    var t;
    t = setInterval(function () {
        $('.tag_Aktif').each(function () {
            var zaman1 = new Date();
            var z1 = parseInt(zaman1.getTime());
            var z2 = parseInt($(this).attr('zaman'));
            if ((z1 - z2) > 30000) {
                $(this).removeClass('tag_Aktif');
                $(this).html('Pasif');
                $(this).parent().parent().find('.konum').find('span, i').hide();
                $(this).attr('zaman', '');
            }
            if ($('#RaporIcerik .alarm').length == 0) {
                $('#FirmaTab button').removeClass('alarm');
            }
        });
    }, 5000);

    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=Firmalar',
        success: function (data) {
            var html = '<button type="button" id="0" class="btn btn-secondary active">Tümü</button>';
            var i = 0;
            $.each(data, function (name, value) {
                html += '<button type="button" id="' + value.ID + '" class="btn btn-secondary">' + value.Firma + ' (' + value.Adet + ')</button>';
                i++;
            });
            $('#FirmaTab').html(html);
            $('#FirmaTab button').click(function () {
                $('#FirmaTab button').removeClass('active');
                $(this).addClass('active');
                PersonelFirma($(this).attr('id'));
            });

            //----
            PersonelFirma(0);
            var socket = io.connect("http://192.168.1.66:3000");
            socket.on("mesajgitti", function (data) {
                var zaman = new Date();
                var veriDizisi = data.split(',');
                var TID;
                var A1;
                var Bt1;
                var Bt3;
                var Bt2;
                var firmaid;
                if (veriDizisi.length == 4) {
                    Bt1 = parseInt(veriDizisi[0]);
                    Bt3 = parseInt(veriDizisi[1]);
                    Bt2 = parseInt(veriDizisi[2]);
                    TID = veriDizisi[3];
                    firmaid = $('#btn1_' + TID).parent().parent().parent().parent().parent().parent().parent().attr('firma_id');
                    if (Bt1 == 1) { //Alarm
                        $('#btn1_' + TID).addClass('alarm');
                        $('#' + firmaid).addClass('alarm');
                        playAudio(1);
                    } else {
                        $('#btn1_' + TID).removeClass('alarm');
                        pauseAudio(1);
                    }
                    if (Bt2 == 1) { //ivme
                        $('#btn2_' + TID).addClass('uyari');
                        playAudio(1);
                    } else {
                        $('#btn2_' + TID).removeClass('uyari');
                        pauseAudio(1);
                    }
                    if (Bt3 == 0) { //takılı
                        $('#btn3_' + TID).addClass('takili');
                    } else {
                        $('#btn3_' + TID).removeClass('takili');
                    }
                } else if (veriDizisi.length == 11) {
                    TID = veriDizisi[9];
                    A1 = veriDizisi[0];
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: 'Servis.aspx?Servis=personelKonum&A1=' + A1,
                        success: function (data) {
                            $.each(data, function (name, value) {
                                $('#konum_' + TID).html(value.Map + ' - ' + value.HaritaAdi + ' - ' + value.BolgeAdi);
                                $('#konum_' + TID).parent().find('.konumIcon').attr("link", "main.html?MapID=" + value.Map_ID);
                            });
                            $('.konumIcon').click(function () {
                                parent.location = $(this).attr('link') + '&tag=' + $(this).attr('tag');

                            });
                        }
                    });
                }
                //$('.tagDurum').removeClass('tag_Aktif');
                if (TID != undefined) {
                    $('#tag_' + TID).attr('zaman', zaman.getTime());
                    $('#tag_' + TID).addClass('tag_Aktif');
                    $('#tag_' + TID).html('Aktif');
                    $('#konum_' + TID).show();
                    $('#konum_' + TID).parent().find('.konumIcon').show();

                }
            });
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });

});
function PersonelFirma(firma_ID) {
    if (firma_ID == 0) {
        $('.personel').show();
    } else {
        $('.personel').hide();
        $('.firma_' + firma_ID).show();
    }
}
function Personel() {
    $('#RaporIcerik').html('Yükleniyor...');
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=PersonelList',
        success: function (data) {
            var htmlp = '';
            $.each(data, function (name, value) {
                htmlp += '<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 personel firma_' + value.Firma_ID + '" firma_id="' + value.Firma_ID + '">';
                htmlp += '<div class="card" >';
                htmlp += '<div class="card-header">';
                htmlp += value.Ad + ' ' + value.Soyad;
                htmlp += '</div>';
                htmlp += '<div class="card-body">';
                htmlp += '<div class="row">';
                htmlp += '<div class="col-md-3">';
                htmlp += '<div class="rounded" style="height:70px; width:70px; overflow:hidden; border:3px solid #ccc;">';
                htmlp += '<img src="/Content/Personel/' + value.ID + '.jpg" style="width:100%;" class="PersonelResim">';
                htmlp += '</div>';
                htmlp += '<i class="fas fa-street-view personelAdim" personel_id="' + value.ID + '"></i>';
                if (value.KamraIp != '') {
                    htmlp += '<i class="fas fa-video personelKamera" ip="' + value.KamraIp + '"></i>';
                }
                htmlp += '</div>';
                htmlp += '<div class="col-md-9">';
                htmlp += '<ul class="list-group">';
                htmlp += '<li class="list-group-item"><b>Departman</b>' + value.Departman + ' - ' + value.Gorev + '</li>';
                htmlp += '<li class="list-group-item"><b>Tag No</b>' + value.TagNo + '</li>';
                htmlp += '<li class="list-group-item"><b>Durum</b>';
                htmlp += '<span class="tagDurum" id="tag_' + value.TagNo + '">Pasif</span>';
                htmlp += '</li >';
                htmlp += '<li class="list-group-item">';
                htmlp += '<span class="buton" id="btn1_' + value.TagNo + '">Alarm</span>';
                htmlp += '<span class="buton" id="btn2_' + value.TagNo + '">Uyarı</span>';
                htmlp += '<span class="buton" id="btn3_' + value.TagNo + '">Takılı</span>';
                htmlp += '</li >';
                htmlp += '<li class="list-group-item konum"><b>Konum</b><span id="konum_' + value.TagNo + '"></span><i tag="' + value.TagNo + '" class="fas fa-map-marker-alt konumIcon" ></i></li>';
                htmlp += '</ul>';
                htmlp += '</div>';
                htmlp += '</div>';
                htmlp += '</div>';
                htmlp += '</div>';
                htmlp += '</div>';
            });
            $('#RaporIcerik').html(htmlp);
            $('.PersonelResim').error(function () {
                $(this).attr('src','/Content/Personel/yok.jpg')
            });
            $('#FirmaTab .active').click();
            $('.personelKamera').click(function () {
                $('.modal-dialog').removeClass('modal-lg');
                $('#exampleModalLong').modal('show');
                var isim = $(this).parent().parent().parent().parent().find('.card-header').html();
                $('.modal-title').html(isim +'<i class="fas fa-sync-alt kameraReload"></i>');
                $('.modal-title').attr('peronel_id', $(this).attr('personel_id'));
                var htmlMap = '<div class="row">';
                htmlMap += '<div class="col-md-12">';
                htmlMap += '<iframe src="http://' + $(this).attr('ip') + '/picture/1/frame/" class="kameraFrame" ></iframe>';
                htmlMap += '</div>';
                htmlMap += '</div>';
                $('.modal-body').html(htmlMap);
                $('.kameraReload').click(function () {
                    var currSrc = $(".kameraFrame").attr("src");
                    $(".kameraFrame").attr("src", currSrc);
                });
            });
            $('.personelAdim').click(function () {
                $('#exampleModalLong .modal-dialog').removeClass('modal-lg');
                $('#exampleModalLong').modal('show');
                var isim = $(this).parent().parent().parent().parent().find('.card-header').html();

                $('#exampleModalLong .modal-title').attr('peronel_id', $(this).attr('personel_id'));
                var htmlMap = '<div class="row">';
                htmlMap += '<div class="col-md-6">';
                htmlMap += '<div class="form-group">';
                htmlMap += '<label>Bölge</label>';
                htmlMap += '<select class="form-control" id="Konum_bolge"><select>';
                htmlMap += '</div>';
                htmlMap += '</div>';
                //htmlMap += '</div>';

                //htmlMap += '<div class="row">';
                htmlMap += '<div class="col-md-6">';
                htmlMap += '<div class="form-group">';
                htmlMap += '<label>Kat</label>';
                htmlMap += '<select class="form-control" id="Konum_kat"><option value="0">--Seçiniz --</option></select>';
                htmlMap += '</div>';
                htmlMap += '</div>';
                htmlMap += '</div>';

                htmlMap += '<div class="row">';
                htmlMap += '<div class="col-md-6">';
                htmlMap += '<div class="form-group">';
                htmlMap += '<label>Tarih</label>';
                htmlMap += '<input type="date" class="form-control" id="Konum_tarih" value="">';
                htmlMap += '</div>';
                htmlMap += '</div>';
                //htmlMap += '</div>';

                //htmlMap += '<div class="row">';
                htmlMap += '<div class="col-md-6">';
                htmlMap += '<div class="form-group"  style="text-align:center; display:none"  id="Konum_btn">';
                htmlMap += '<label>...</label>';
                htmlMap += '<input type="button" class="btn btn-success form-control" value="Göster" >';
                htmlMap += '</div>';
                htmlMap += '</div>';
                htmlMap += '</div>';

                $('#exampleModalLong .modal-body').html(htmlMap);
                var today = new Date();
                $("#Konum_tarih").val(today.getFullYear().toString() + '-' + cift(today.getMonth() + 1) + '-' + cift(today.getDate().toString()));

                $('#Konum_btn').click(function () {
                    $('#modalPersonelAdim .modal-title').text(isim + ' ' + $('#Konum_tarih').val());
                    if ($('#Konum_tarih').val() != '') {
                        $('#modalPersonelAdim .modal-dialog').addClass('modal-lg');
                        $('#modalPersonelAdim .modal-body').html('<iframe src="/personelRoot.aspx?p_ID=' + $('.modal-title').attr('peronel_id') + '&h_ID=' + $('#Konum_bolge option:selected').val() + '&tarih=' + $("#Konum_tarih").val() + '&q=' + Math.random() + '"></iframe>');
                        var h = $(window).height();
                        $('iframe').css({ height: h - 200 + 'px' });
                        $('#modalPersonelAdim').modal('show');
                    } else {
                        Hata('Lütfen tarih seçiniz.');
                    }
                });

                Yukleniyor(1);
                htmlMap = '';
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: 'Servis.aspx?Servis=Map',
                    success: function (data) {
                        htmlMap += '<option value="0">-- Seçiniz --</option>';
                        $.each(data, function (name, value) {
                            htmlMap += '<option value="' + value.ID + '">' + value.Map + '</option>';
                        });
                        $('#Konum_bolge').html(htmlMap);
                        Yukleniyor(0);
                        $('#Konum_bolge').change(function () {
                            var id = $('#Konum_bolge option:selected').val();
                            htmlMap = '';
                            $.ajax({
                                type: "GET",
                                dataType: "json",
                                url: 'Servis.aspx?Servis=Haritalar&MapID=' + id,
                                success: function (data) {
                                    htmlMap += '<option value="0">-- Seçiniz --</option>';
                                    $.each(data, function (name, value) {
                                        htmlMap += '<option value="' + value.ID + '">' + value.HaritaAdi + '</option>';
                                    });
                                    $('#Konum_kat').html(htmlMap);
                                    $('#Konum_kat').change(function () {
                                        var id = $('#Konum_kat option:selected').val();
                                        if (id == 0) {
                                            $('#Konum_btn').hide();
                                        } else {
                                            $('#Konum_btn').show();
                                        }

                                    });
                                },
                                error: function () {
                                    Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                                }
                            });
                        });
                    },
                    error: function () {
                        Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                    }
                });
            });
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
}