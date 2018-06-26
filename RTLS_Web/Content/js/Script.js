
var Basla = 0;
var A1_X;
var A1_Y;
var A2_X;
var A2_Y;
var A3_X;
var A3_Y;
var Personel;
var step = 0;
var zoneAktif = 0;
var MzoneAktif = 0;
var oran = 1;
var TagIcon_Arac = "fa-car";
var TagIcon_Insan = "fa-user";
var TagIcon_Cihaz = "fa-cube";
var bosluk = 50;
var MasterMesafe = 2000;
var say = 0;
var hedef = '';
var OdaklanTag = 0;
$(document).ready(function () {
    Yukleniyor(1);
    hedef = getParameterByName('tag');

    var socket = io.connect("http://192.168.1.66:3000");
    Yukleniyor(2);
    socket.on("mesajgitti", function (data) {

        if (step == 3) {
            Yukleniyor(0);

            var veriDizisi = data.split(',');
            var A1;
            var A1_mesafe;
            var A2;
            var A2_mesafe;
            var A3;
            var A3_mesafe;
            var TID;
            var Btn1;
            var Btn2;
            var BtnTID;

            var zaman = new Date();

            if (veriDizisi.length == 4) {
                Bt1 = parseInt(veriDizisi[0]);
                Bt3 = parseInt(veriDizisi[1]);
                Bt2 = parseInt(veriDizisi[2]);
                BtnTID = veriDizisi[3];
                if (Bt1 == '1' || Bt2 == '1') {
                    if ($('#Tag_' + BtnTID + ' .alarm').length == 0) {
                        $('#Tag_' + BtnTID).append('<div class="alarm"></div>');
                        $('#PersonelTag_' + BtnTID).addClass('PersonelListAlarm');
                        if ($('#Personel_' + BtnTID).length) {
                            $('#Personel_' + BtnTID).addClass('PersonelListAlarm');
                        }
                    }
                    playAudio(1);
                }
                //if (Bt2 == '1') {
                //    if ($('#Tag_' + BtnTID + ' .uyari').length == 0) {
                //        $('#Tag_' + BtnTID).append('<div class="uyari"></div>');
                //        $('#PersonelTag_' + BtnTID).addClass('PersonelListUyari');
                //        if ($('#Personel_' + BtnTID).length) {
                //            $('#Personel_' + BtnTID).addClass('PersonelListUyari');
                //        }
                //    }
                //    playAudio(2);
                //}

                if (Bt3 == '0') {
                    $('#PersonelTag_' + BtnTID + ' lock').show();
                } else {
                    $('#PersonelTag_' + BtnTID + ' lock').hide();
                }
            } else if (veriDizisi.length == 3) {
                TID = String.fromCharCode(veriDizisi[0]);
                //TID += String.fromCharCode(veriDizisi[13]);
                OdaIslem = String.fromCharCode(veriDizisi[2]);
                OdaNo = "1";//String.fromCharCode(veriDizisi[7]);

                if (OdaIslem == 2) {
                    $('.giris').show();
                    setTimeout(function () {
                        $('.giris').fadeOut('slow');
                    }, 2000);
                    //$('#PersonelTag_' + TID).show('slow');
                    $('#PersonelTag_' + TID).addClass('PersonelListAktif');

                    if ($('#Oda_' + OdaNo + ' ul li[tagno="' + TID + '"]').length == 0) {
                        $('#Oda_' + OdaNo + ' ul').append('<li tagno="' + TID + '">' + $('#PersonelTag_' + TID + ' a').html() + '</li>');
                    }
                } else {
                    $('.cikis').show();
                    setTimeout(function () {
                        $('.cikis').fadeOut('slow');
                    }, 2000);
                    $('#PersonelTag_' + TID).removeClass('PersonelListAktif');
                    if ($('#Oda_' + OdaNo + ' ul li[tagno="' + TID + '"]').length == 1) {
                        $('#Oda_' + OdaNo + ' ul li[tagno="' + TID + '"]').remove();
                    }
                }
                OdaKisi = $('#Oda_' + OdaNo + ' ul li').length;
                $('#Oda_' + OdaNo + ' span').html(OdaKisi);

                if (OdaKisi == 0) {
                    $('#Oda_' + OdaNo).fadeOut('slow');
                } else {
                    $('#Oda_' + OdaNo).fadeIn('slow');
                }
            } else {

                //if (oran == NaN) { parseInt($('#oran').val()); }
                A1 = veriDizisi[0];
                A1_mesafe = Number(veriDizisi[1]);
                A1_mesafe += Number(veriDizisi[2]) * 256;
                A2 = veriDizisi[3];
                A2_mesafe = parseInt(veriDizisi[4]);
                A2_mesafe += parseInt(veriDizisi[5]) * 256;
                A3 = veriDizisi[6];
                A3_mesafe = parseInt(veriDizisi[7]);
                A3_mesafe += parseInt(veriDizisi[8]) * 256;
                TID = parseInt(veriDizisi[9]);

                if ($('#Anchor_' + A1).length > 0 && $('#Anchor_' + A2).length > 0 && $('#Anchor_' + A3).length > 0) {
                    
                    oran = parseInt($('#Anchor_' + A1).parent().attr('oran'))

                    A1_mesafe = Math.round(A1_mesafe / oran);
                    A2_mesafe = Math.round(A2_mesafe / oran);
                    A3_mesafe = Math.round(A3_mesafe / oran);
                    
                    //--------
                    A1_mesafe = Math.round(Math.sqrt(kare(A1_mesafe) - kare(parseInt($('#Anchor_' + A1).attr('z')) / oran)));
                    A2_mesafe = Math.round(Math.sqrt(kare(A2_mesafe) - kare(parseInt($('#Anchor_' + A2).attr('z')) / oran)));
                    A3_mesafe = Math.round(Math.sqrt(kare(A3_mesafe) - kare(parseInt($('#Anchor_' + A3).attr('z')) / oran)));
                    //--------

                    A1_X = parseInt($('#Anchor_' + A1).css('left').replace('px', ''));
                    A1_Y = parseInt($('#Anchor_' + A1).css('top').replace('px', ''));

                    A2_X = parseInt($('#Anchor_' + A2).css('left').replace('px', ''));
                    A2_Y = parseInt($('#Anchor_' + A2).css('top').replace('px', ''));

                    A3_X = parseInt($('#Anchor_' + A3).css('left').replace('px', ''));
                    A3_Y = parseInt($('#Anchor_' + A3).css('top').replace('px', ''));


                    var Olcu1;
                    var Olcu2;
                    var anchorDurum = 0;
                    var x;
                    var y;

                    if (anchorDurum == 1) {
                        Olcu1 = Math.round(A1_Y - A2_Y);
                        Olcu2 = Math.round(A3_X - A1_X);
                        x = (kare(A1_mesafe) - kare(A3_mesafe) + kare(Olcu2)) / (2 * Olcu2);
                        y = (kare(A1_mesafe) - kare(A2_mesafe) + kare(Olcu1)) / (2 * Olcu1);
                        y = Math.round(y) + A2_Y + bosluk;
                        x = Math.round(x) + A2_X + bosluk;
                    } else {
                        Olcu1 = Math.round(A2_X - A1_X);
                        Olcu2 = Math.round(A3_Y - A1_Y);
                        y = (kare(A1_mesafe) - kare(A3_mesafe) + kare(Olcu2)) / (2 * Olcu2);
                        x = (kare(A1_mesafe) - kare(A2_mesafe) + kare(Olcu1)) / (2 * Olcu1);
                        y = Math.round(y) + A1_Y + bosluk;
                        x = Math.round(x) + A1_X + bosluk;
                    }
                    
                    if ($("#Tag_" + TID).length == 0) {
                        
                        if (x !== NaN && y !== NaN) {
                            
                            $.ajax({
                                type: "GET",
                                dataType: "json",
                                url: 'Servis.aspx?Servis=Tag&tid=' + TID,
                                success: function (data) {
                                    
                                    var obj = jQuery.parseJSON(JSON.stringify(data));
                                    //console.log(x + 'x' + y);
                                    $("#Anchor_" + A1).parent().append('<div isim="' + obj[0].isim + '" tagno="' + TID + '" ara="' + obj[0].isim + ' ' + obj[0].isim.toLowerCase() + ' ' + TID + '" class="kisi fas ' + obj[0].TagTipi + '" zaman="' + zaman.getTime() + '" id="Tag_' + TID + '" style="left:' + x + 'px; top:' + y + 'px" onClick="PersonelBilgi(\'' + TID + '\')"><span>' + obj[0].isim + '</span></div>');
                                    $('#PersonelTag_' + TID).show('slow');
                                    $('#PersonelTag_' + TID).addClass('PersonelListAktif');

                                    if (parseInt(hedef) == TID) {
                                        hedef = '';
                                        $('#PersonelTag_' + TID + ' a').click();
                                    }
                                },
                                error: function () {
                                    Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                                }
                            });
                        }
                    } else {
                        //console.log('başla');
                        $('#Tag_' + TID).attr('zaman', zaman.getTime());
                        var k = $('#Tag_' + TID).position();

                        $('#Tag_' + TID).stop().animate({ left: x + 'px', top: y + 'px' }, 100);
                        if (OdaklanTag != 0) { Odaklan(OdaklanTag); }
                        say++;
                    }

                    $('.kisi').each(function () {
                        var z1 = parseInt(zaman.getTime());
                        var z2 = parseInt($(this).attr('zaman'));

                        if ((z1 - z2) > 30000) {
                            $('#PersonelTag_' + $(this).attr('id').replace('Tag_', '')).removeClass('PersonelListAktif');
                            $(this).remove();
                        }
                    });
                    if (zoneAktif == 1) {
                        $('#zone_' + A1).css({ width: A1_mesafe * 2 + 'px', height: A1_mesafe * 2 + 'px', top: ((A1_mesafe) - 7) * -1 + 'px', left: ((A1_mesafe) - 7) * -1 + 'px' });
                        $('#zone_' + A2).css({ width: A2_mesafe * 2 + 'px', height: A2_mesafe * 2 + 'px', top: ((A2_mesafe) - 7) * -1 + 'px', left: ((A2_mesafe) - 7) * -1 + 'px' });
                        $('#zone_' + A3).css({ width: A3_mesafe * 2 + 'px', height: A3_mesafe * 2 + 'px', top: ((A3_mesafe) - 7) * -1 + 'px', left: ((A3_mesafe) - 7) * -1 + 'px' });

                        //console.log(collision($('#zone_' + A1), $('#zone_' + A2)));
                    }
                }
                
                $("#GelenVeri").html(TID + ": " + A1 + "," + A1_mesafe + "," + A2 + "," + A2_mesafe + "," + A3 + "," + A3_mesafe + "<br />" + (Olcu1 * oran) / 100 + 'm x' + (Olcu2 * oran) / 100 + 'm');
            }
        }
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=Ayarlar',
        success: function (data) {
            var obj = jQuery.parseJSON(JSON.stringify(data));

            $('#oran').val(obj.Oran);
            $('#tolerans').val(obj.Tolerans);
            //oran = parseInt(obj.Oran);
            masterkapsama(MasterMesafe / oran);
            step++;
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=PersonelList',
        success: function (data) {
            oran = parseInt($('#oran').val());
            Personel = data;
            var html = '';
            $.each(data, function (name, value) {
                if (value.KamraIp != '') {
                    html += '<li id="PersonelTag_' + value.TagNo + '" ara="' + value.Ad + ' ' + value.Soyad + ' ' + value.TagNo + '" tag="' + value.TagNo + '" ip="' + value.KamraIp + '"><eye class="fas fa-eye-slash"></eye><a>' + value.Ad + ' ' + value.Soyad + '</a><i class="fas ' + value.TagTipi + '"></i><span>' + value.TagNo + '</span><kmr class="fas fa-video"></kmr><lock class="fas fa-lock"></lock>';
                } else {
                    html += '<li id="PersonelTag_' + value.TagNo + '" ara="' + value.Ad + ' ' + value.Soyad + ' ' + value.Ad.toLowerCase() + ' ' + value.Soyad.toLowerCase() + ' ' + value.TagNo + '" tag="' + value.TagNo + '"><eye class="fas fa-eye-slash"></eye><a>' + value.Ad + ' ' + value.Soyad + '</a><i class="fas ' + value.TagTipi + '"></i><span>' + value.TagNo + '</span><lock class="fas fa-lock"></lock>';
                }
                html += '</li>';
            });

            $('#PersonelList').append(html);

            $('eye').click(function () {
                var id = $(this).parent().attr('tag');
                if ($(this).hasClass('fa-eye')) {
                    OdaklanTag = 0;
                    $('eye').removeClass('fa-eye');
                    $('eye').addClass('fa-eye-slash');
                } else {
                    $('eye').removeClass('fa-eye');
                    $('eye').addClass('fa-eye-slash');
                    $(this).removeClass('fa-eye-slash');
                    $(this).addClass('fa-eye');
                    OdaklanTag = id;
                }
            });

            $('#PersonelList li').mouseover(function () {
                if ($('#taglabel').is(":checked") == false) {
                    $('#Tag_' + $(this).attr('tag') + ' span').show();
                }
            }).mouseout(function () {
                if ($('#taglabel').is(":checked") == false) {
                    $('#Tag_' + $(this).attr('tag') + ' span').hide()
                }
            });

            $('#PersonelList li a').click(function () {
                Default();
                var tag = $(this).parent().attr('tag');
                Odaklan(tag);
            });
            $('#PersonelList li a').dblclick(function () {
                var tag = $(this).parent().attr('tag');
                PersonelBilgi(tag);
            });
            $('#PersonelList li .fa-video').click(function () {
                var tag = $(this).parent().attr('tag');
                var kamera = $(this).parent().attr('ip');
                $('#Tag_' + tag + " .miniKamera").remove();

                if ($(this).attr('kameraOn') != '1') {
                    $(this).attr('kameraOn', '1');
                    $('#Tag_' + tag).append('<iframe class="miniKamera" src="http://' + kamera + '/picture/1/frame/"></iframe>');
                } else {
                    $(this).attr('kameraOn', '0');
                }



            });
            step++;
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=Haritalar&MapID=' + querySt("MapID"),
        success: function (data) {
            var html = '';
            var harita = '';
            $.each(data, function (name, value) {
                html += '<li>' + value.HaritaAdi + '</li>';
                harita += '<div class="HaritaTab" oran="' + value.Oran + '" id="Harita_' + value.ID + '" anchor=""><img src="/Content/Data/Map/' + value.ID + '.jpg?q=' + Math.random() + '" /></div>';
            });
            $('.Tabs').html('<li onclick="parent.location=\'index.html\'"><i class="fas fa-home"></i></li>' + html + '<li onclick="map(1)" class="mapDegistir"><i class="far fa-map"></i></li>');
            $('.Harita').html('<div class="HaritaTab" ></div>' + harita);
            $('.zoomPlus').click(function () {
                zoom('+');
            });
            $('.zoomMin').click(function () {
                zoom('-');
            });
            $('.rotateL').click(function () {
                rotate('L');
            });
            $('.rotateR').click(function () {
                rotate('R');
            });
            $('.default').click(function () {
                Default();
            });
            $('.HaritaTab').bind('DOMMouseScroll', function (e) {
                if (e.originalEvent.detail > 0) {
                    zoom('+');
                } else {
                    zoom('-');
                }
                return false;
            });
            $('.HaritaTab').bind('mousewheel', function (e) {
                if (e.originalEvent.wheelDelta < 0) {
                    zoom('+');
                } else {
                    zoom('-');
                }
                return false;
            });
            $(".haritaTab").draggable();
            AnchorKonumlandir();
            OdaKonumlandir();
            $('.Tabs li').click(function () {
                if ($(this).hasClass('mapDegistir') == false) {
                    var i = $(this).index();
                    $('.Tabs li').removeClass('TabsAktif');
                    $(this).addClass('TabsAktif');

                    $('.Harita .HaritaTab').hide();
                    $('.Harita .HaritaTab').eq(i).show();
                }
            });
            $('.Tabs li').eq(1).click();
            step++;
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
    var menuRight = 0;
    $('#Ayarlar').click(function () {
        if (menuRight == 0) {
            $('.menuRight').fadeIn('slow');
            menuRight = 1;
        } else {
            $('.menuRight').fadeOut('slow');
            menuRight = 0;
        }
    });
    $('#kapsama').click(function () {
        if ($(this).is(":checked")) {
            zoneAktif = 1;
            $('.anchor[no!="AMaster"] .zone').show();
        } else {
            zoneAktif = 0;
            $('.anchor[no!="AMaster"] .zone').hide();
        }
    });
    $('#Mkapsama').click(function () {
        if ($(this).is(":checked")) {
            MzoneAktif = 1;
            $('.anchor[no="AMaster"] .zone').show();
        } else {
            MzoneAktif = 0;
            $('.anchor[no="AMaster"] .zone').hide();
        }
    });
    $('#anchorGoster').click(function () {
        if ($(this).is(":checked")) {
            $('.anchor').show();
        } else {
            $('.anchor').hide();
        }
    });
    $('#anchorTasi').click(function () {
        if ($(this).is(":checked")) {
            $('.anchor').addClass('anchorTasi');
            $('.anchor .konum').show();
            $(".anchor").draggable({
                disabled: false,
                start: function () {
                },
                drag: function () {
                    var xPos = $(this).css('left').replace('px', '');
                    var yPos = $(this).css('top').replace('px', '');
                    $('.konum', this).html(xPos + 'x' + yPos);
                },
                stop: function () {
                    var harita = $('.Harita').offset();
                    var id = $(this).attr('id0');
                    var konum = $('.konum', this).html().split('x');
                    var x = parseInt(konum[0]);
                    var y = parseInt(konum[1]);;
                    var no = $(this).attr('no');
                    anchorKonumKaydet(id, x, y, no);
                }
            });
        } else {
            $('.anchor').draggable({ disabled: true });
            $('.anchor').removeClass('anchorTasi');
            $('.anchor .konum').hide();
        }
    });
    $('#taglabel').click(function () {
        if ($(this).is(":checked")) {
            $('.kisi span').show();
        } else {
            $('.kisi span').hide();
        }
    });
    var tPing;
    $('#ping').click(function () {
        $('.anchor').removeClass('ipSuccess');
        $('.anchor').removeClass('ipFail');

        if ($(this).is(":checked")) {
            ping();
            tPing = setInterval(function () {
                ping();
            }, 8000);
        } else {
            clearInterval(tPing);
        }
    });
    $('.VideoKapat').click(function () {
        $('.KameraPopUp').hide();
        $('.KameraPopUp ul').html('');
        $('.KameraPopUp video').remove();
    });
    $('.Sayi').click(function () {
        if ($(this).val() == '') { $(this).val(0) }
        if ($(this).val() == '0') { $(this).select(); }
    });
    $('.Sayi').keyup(function () {
        if ($(this).val() == '') { $(this).val(0) }
        $(this).val($(this).val().replace(',', '.'));
        var sonKarakter = $(this).val().charAt($(this).val().length - 1);
        if (sonKarakter == '.') {

        } else if ($.isNumeric(sonKarakter) == false) {
            $(this).val($(this).val().replace(sonKarakter, ''));
        } else {
            $(this).val(parseFloat($(this).val()));
        }
        $(this).val($(this).val().replace('.', ','));
    });
    $('#AyarlarBtn').click(function () {
        window.open('/Ayarlar/default.aspx');
    });
    $('.tagAra').keyup(function () {
        if ($(this).val() == '') {
            $('#PersonelList li').show();
            $('.kisi').show();
        } else {
            $('#PersonelList li').hide();
            $('.kisi').hide();
            $('#PersonelList li[ara*="' + $(this).val() + '"]').show();
            $('.kisi[ara*="' + $(this).val() + '"]').show();
        }
    });
});
function anchorKonumKaydet(id, x, y, no) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "Servis.aspx?Servis=KonumKaydet&id=" + id + "&x=" + x + "&y=" + y + "&no=" + no,
        success: function (data) { },
        error: function () { }
    });
}
function PersonelBilgi(tag) {
    $.each(Personel, function (name, value) {
        if (value.TagNo == tag) {
            var html = '';
            if ($('#PersonelTag_' + tag).hasClass('PersonelListAlarm')) {
                html += '<div class="popUpPersonel PersonelListAlarm" id="Personel_' + tag + '">';
            } else if ($('#PersonelTag_' + tag).hasClass('PersonelListUyari')) {
                html += '<div class="popUpPersonel PersonelListUyari" id="Personel_' + tag + '">';
            } else {
                html += '<div class="popUpPersonel" id="Personel_' + tag + '">';
            }
            html += '<div class="PersonelBilgi">';
            html += '<i class="far fa-times-circle bilgiIcon kapat"></i>';
            if (value.KamraIp != '') {
                html += '<i class="fas fa-sync-alt bilgiIcon kamerareload"></i>';
                html += '<i class="far fa-list-alt bilgiIcon arsiv" onclick="Arsiv(\'' + value.KamraIp + '\')"></i>';
            }
            html += '<div id="PersonelResim">';
            html += '<div id="PersonelResim1">';
            html += '<img src="/Content/Personel/' + value.ID + '.jpg" />';
            html += '</div>';
            html += '</div>';
            html += '<div class="TagNo">';
            html += '<i class="fas fa-tag"></i><span>' + tag + '</span>';
            html += '</div>';
            html += '<div class="PersonelAdi">' + value.Ad + ' ' + value.Soyad + '</div><div class="firma">' + value.Firma + '</div><div class="departman">' + value.Departman + '</div><div class="gorev">' + value.Gorev + '</div>';
            if ($('#PersonelTag_' + tag).hasClass('PersonelListAlarm')) {
                html += '<button type="button" class="btn AlarmKapat" onclick="AlarmKapat(' + tag + ')">Alarm Kapat</button>';
            }
            if ($('#PersonelTag_' + tag).hasClass('PersonelListUyari')) {
                html += '<button type="button" class="btn UyariKapat" onclick="UyariKapat(' + tag + ')">Uyarı Kapat</button>';
            }
            html += '</div>';
            if (value.KamraIp != '') {
                html += '<iframe class="Kamera" src="http://' + value.KamraIp + '/picture/1/frame/" ></iframe>';
            }
            html += '</div >';
            $('body').append(html);

            var pencerefark = $('.popUpPersonel').length * 20;
            $('#Personel_' + tag).css({ marginLeft: '+=' + pencerefark, marginTop: '+=' + pencerefark });
            $('#Personel_' + tag).fadeIn('slow');

            $('.kapat').click(function () {
                $(this).parent().parent().fadeOut('slow', function () {
                    $(this).remove();
                })
            });
            $('.kamerareload').click(function () {
                var iframe = $(this).parent().parent().find('.Kamera');
                iframe.attr('src', iframe.attr('src'));
            });

        }
    });
}
function AlarmKapat(tag) {
    $('#Personel_' + tag).removeClass('PersonelListAlarm');
    $('#PersonelTag_' + tag).removeClass('PersonelListAlarm');
    $('#Tag_' + tag + ' .alarm').remove();
    $('#Personel_' + tag + ' .kapat').click();
    pauseAudio(1);
}
function UyariKapat(tag) {
    $('#Personel_' + tag).removeClass('PersonelListUyari');
    $('#PersonelTag_' + tag).removeClass('PersonelListUyari');
    $('#Tag_' + tag + ' .uyari').remove();
    $('#Personel_' + tag + ' .kapat').click();
    pauseAudio(2);
}
function kare(a) { return a * a; }
function Arsiv(ip) {
    Yukleniyor(1);
    $.ajax({
        type: "GET",
        dataType: "json",
        crossDomain: true,
        url: 'Servis.aspx?Servis=Arsiv&ip=' + ip,
        success: function (data) {
            Yukleniyor(0);
            var html = '';
            $.each(data.mediaList, function (name, value) {
                html += '<li path="' + value.path + '">' + value.path.replace('.mp4', '') + '</li>';
            });
            Yukleniyor(0);
            $('.KameraPopUp ul').append(html);
            $('.KameraPopUp').fadeIn('slow');

            $('.KameraPopUp ul li').click(function () {
                $('.KameraPopUp video').remove();
                var ipp = ip.split('.');
                var path = $(this).attr('path');
                var html = '<video controls>';
                html += '<source src="/Cam/' + ipp[3] + path + '" type="video/mp4" >';
                html += '</video >';
                $('.KameraPopUp').append(html);

                $('video source').error(function () {
                    $('.KameraPopUp video').remove();
                    window.open("http://" + ip + "/movie/1/download/" + path);
                });
            });
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
}
function AyarKaydet() {
    var res = $("#FormAyarlar").serialize();
    Yukleniyor(1);
    $.ajax({
        type: "POST",
        dataType: "json",
        data: res,
        url: 'Servis.aspx?Servis=AyarKaydet',
        success: function (data) {
            Yukleniyor(0);
            var obj = jQuery.parseJSON(JSON.stringify(data));
            if (obj.durum == "1") {
                OK('Ayarlar kaydedildi.');
                //oran = parseInt($('#oran').val());

                masterkapsama(MasterMesafe / oran);
                //$.ajax({
                //    type: "GET",
                //    dataType: "json",
                //    url: 'Servis.aspx?Servis=AnchorKonum',
                //    success: function (data) {
                //        var html = '';
                //        $.each(data, function (name, value) {

                //            A1_X = parseInt(value.Anchor1_X) / oran;
                //            A1_Y = parseInt(value.Anchor1_Y) / oran;
                //            A2_X = parseInt(value.Anchor2_X) / oran;
                //            A2_Y = parseInt(value.Anchor2_Y) / oran;
                //            A3_X = parseInt(value.Anchor3_X) / oran;
                //            A3_Y = parseInt(value.Anchor3_Y) / oran;

                //        });
                //    },
                //    error: function () {
                //        Hata("Hata oluştu. Lütfen tekrar deneyiniz");
                //    }
                //});

            } else {
                OK(obj.Hata);
            }
        },
        error: function () {
            $('#Yukleniyor').fadeOut('slow');
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
}
function OdaKonumlandir() {
    var Oda = '<div id="OdaKapi_1" class="OdaKapi">';
    Oda += '<i class="fas fa-arrow-down cikis"></i>';
    Oda += '<i class="fas fa-arrow-up giris"></i>';
    Oda += '</div >';
    Oda += '<div id="Oda_1" class="Oda"><span>';
    Oda += '</span >';
    Oda += '<ul></ul>';
    Oda += '</div > ';
    $('#Harita_13').append(Oda);
}
function AnchorKonumlandir() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'Servis.aspx?Servis=AnchorKonum',
        success: function (data) {
            var html = '';
            $.each(data, function (name, value) {

                A1_X = parseInt(value.Anchor1_X) / oran;
                A1_Y = parseInt(value.Anchor1_Y) / oran;
                A2_X = parseInt(value.Anchor2_X) / oran;
                A2_Y = parseInt(value.Anchor2_Y) / oran;
                A3_X = parseInt(value.Anchor3_X) / oran;
                A3_Y = parseInt(value.Anchor3_Y) / oran;

                html = '<div class="anchor" no="A1" z="' + value.Anchor1_Z + '" ip="' + value.Anchor1_Ip + '" id0="' + value.ID + '" id="Anchor_' + value.Anchor1_ID + '" style="left:' + value.Anchor1_X + 'px; top:' + value.Anchor1_Y + 'px;" >' + value.Anchor1_ID + '<div class="zone" id="zone_' + value.Anchor1_ID + '"></div><div class="konum">' + value.Anchor1_X + 'x' + value.Anchor1_Y + '</div></div>';
                html += '<div class="anchor" no="A2" z="' + value.Anchor1_Z + '" ip="' + value.Anchor2_Ip + '" id0="' + value.ID + '" id="Anchor_' + value.Anchor2_ID + '" style="left:' + value.Anchor2_X + 'px; top:' + value.Anchor2_Y + 'px;" >' + value.Anchor2_ID + '<div class="zone" id="zone_' + value.Anchor2_ID + '"></div><div class="konum">' + value.Anchor2_X + 'x' + value.Anchor2_Y + '</div></div>';
                html += '<div class="anchor" no="A3" z="' + value.Anchor1_Z + '" ip="' + value.Anchor3_Ip + '" id0="' + value.ID + '" id="Anchor_' + value.Anchor3_ID + '" style="left:' + value.Anchor3_X + 'px; top:' + value.Anchor3_Y + 'px;" >' + value.Anchor3_ID + '<div class="zone" id="zone_' + value.Anchor3_ID + '"></div><div class="konum">' + value.Anchor3_X + 'x' + value.Anchor3_Y + '</div></div>';
                html += '<div class="anchor" no="AMaster" ip="' + value.AnchorMaster_Ip + '" id0="' + value.ID + '" id="Anchor_' + value.AnchorMaster_ID + '" z="0" Anchor_ID="' + value.AnchorMaster_ID + '" style="left:' + value.AnchorMaster_X + 'px; top:' + value.AnchorMaster_Y + 'px;" >' + value.AnchorMaster_ID + '<div class="zone zonemaster" id="zone_' + value.AnchorMaster_ID + '"></div><div class="konum">' + value.AnchorMaster_X + 'x' + value.AnchorMaster_Y + '</div></div>';

                $('#Harita_' + value.Harita_ID).append(html)
            });
            masterkapsama(MasterMesafe / oran);

            $('.anchor').dblclick(function () {
                var id = $(this).attr('id0');
                var no = $(this).attr('no');

                //$('.modal-dialog').addClass('modal-lg');
                //$('#ZonKonumlandir').modal('show');
                //$('.modal-title').text('Zon konumlandır');

                var konum = window.prompt(no + '[' + $('.zone', this).attr('id').replace('zone_', '') + '] anchor konumu (X x Y)', $(this).css('left').replace('px', '') + 'x' + $(this).css('top').replace('px', ''));
                if (konum != null) {
                    konum = konum.split('x');
                    anchorKonumKaydet(id, konum[0], konum[1], no);
                    $(this).css({ left: konum[0] + 'px', top: konum[1] + 'px' });
                    $('.konum', this).html(konum[0] + 'x' + konum[1]);
                }
            });
        },
        error: function () {
            Hata("Hata oluştu. Lütfen tekrar deneyiniz");
        }
    });
}
function masterkapsama(m) {
    $('.zonemaster').css({ left: (m * -1) + 'px', top: (m * -1) + 'px', width: (m * 2) + 'px', height: (m * 2) + 'px' });
}
function ping() {
    $('.anchor').each(function () {
        var id = $(this).attr('id');

        $.ajax({
            type: "GET",
            dataType: "json",
            url: 'Servis.aspx?Servis=ping&ip=' + $(this).attr('ip'),
            success: function (data) {
                $('#' + id).removeClass('ipSuccess');
                $('#' + id).removeClass('ipFail');
                var obj = jQuery.parseJSON(JSON.stringify(data));
                if (obj.durum == "1") {
                    $('#' + id).addClass('ipSuccess');
                } else {
                    $('#' + id).addClass('ipFail');
                }
            },
            error: function () {
                Hata("Hata oluştu. Lütfen tekrar deneyiniz");
            }
        });
    });
}
var currZoom = 1;
function zoom(a) {
    if (a == "+") {
        currZoom += 0.04;
    } else {
        currZoom -= 0.04;
    }
    //console.log(currZoom);
    $(".HaritaTab").css("zoom", currZoom);
    $(".HaritaTab").css("-moz-transform", "Scale(" + currZoom + ")");
    $(".HaritaTab").css("-moz-transform-origin", "0 0");
}
var aci = 0;
function rotate(a) {
    if (a == "L") {
        aci += 3;
    } else {
        aci -= 3;
    }
    $(".HaritaTab").rotate(aci);
    //$('.HaritaTab').transition({ rotate: '-10deg' }, 5000, 'ease');
}
function Default() {
    aci = 0;
    currZoom = 1;
    $(".HaritaTab").rotate(0);
    $(".HaritaTab").css("zoom", 0);
    $(".HaritaTab").css("-moz-transform", "Scale(0)");
    $(".HaritaTab").css("-moz-transform-origin", "0 0");
    $('.HaritaTab').css({ left: '0px', top: '0px;' });
}
function querySt(ji) {
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }
}
function Odaklan(tag) {
    var w = $(window).width() - 210;
    var h = $(window).height() - 60;
    var $target = $('.Harita');

    var $kisi = $('#Tag_' + tag);
    var sekme = $kisi.parent().index();
    if (sekme != -1) {
        $('.Tabs li').eq(sekme).click();
   
        w = w / currZoom;
        h = h / currZoom;
        $target.scrollTo($kisi, 1000, { offset: function () { return { top: (h / 2) * -1, left: (w / 2) * -1 }; } });
    }
}

