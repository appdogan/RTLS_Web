var host = "http://192.168.1.66:8003/";
var modal = '<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" >';
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
//modal += '<div class="modal-footer">';
//modal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>';
//modal += '<button type="button" id="ModalKaydet" class="btn btn-primary">Kaydet</button>';
//modal += '</div>';
modal += '</div>';
modal += '</div>';
modal += '</div>';

$(function () {
    var body = '<div id="Yukleniyor"><span>Yükleniyor...</span></div>';
    body += '<div class="menuUp">';
    body += '<img src="/Content/img/logo1.png" id="Logo" />';
    body += '<ul class="Tabs"></ul>';
    body += '<div id="Hata"></div>';
    body += '</div>';
    body += '<img src="/Content/img/Globax_Logo.png" id="Globax_Logo" />';
    body += '<audio id="AlarmSound" loop>';
    body += '<source src="/Content/Alarm.mp3" type="audio/mpeg">';
    body += '</audio>';
    body += '<audio id="UyariSound" loop>';
    body += '<source src="/Content/Uyari.mp3" type="audio/mpeg">';
    body += '</audio>';
    body += modal;
    $('body').append(body);
    $("body").ezBgResize({
        img: "/Content/img/bg.jpg",
        opacity: 1,
        center: true
    });
});
function Yukleniyor(i) {
    if (i == 0) {
        $('#Yukleniyor').fadeOut('slow');
    } else if (i == 1) {
        $('#Yukleniyor').fadeIn('slow');
        $('#Yukleniyor span').html('Yükleniyor...');
    } else if (i == 2) {
        $('#Yukleniyor').fadeIn('slow');
        $('#Yukleniyor span').html('Veri bekleniyor...');
    }
}
function Hata(mesaj) {
    Yukleniyor(0);
    hata(mesaj, '');
}
function OK(mesaj) {
    Onay(mesaj, '');
}
function Onay(mesaj, link) {
    swal({
        type: 'success',
        text: mesaj,
        showConfirmButton: true,
        confirmButtonText: 'Tamam'
    }, function (isConfirm) {
    });
    $('.swal2-confirm').click(function () {
        if (link != '' && link !== null) {
            window.location.href = link;
        }
    });
}
function hata(mesaj, link) {
    swal({
        type: 'error',
        title: 'Hata.',
        text: mesaj,
        showConfirmButton: true,
        confirmButtonText: 'Tamam'
    }, function (isConfirm) {
    });
    $('.swal2-confirm').click(function () {
        if (link != '' && link !== null) {
            window.location.href = link;
        }
    });
}
function map(i) {
    if (i == 1) {
        $('.modal-dialog').addClass('modal-lg');
        $('#exampleModalLong').modal('show');
        $('.modal-title').text('Bölge Seçiniz');
        Yukleniyor(1);
        $('.modal-body').html('Yükleniyor...');
        $.ajax({
            type: "GET",
            dataType: "json",
            url: 'Servis.aspx?Servis=Map',
            success: function (data) {
                var html = '<div class="row">';
                $.each(data, function (name, value) {
                    html += '<div class="col-md-4">';
                    html += '<div class="card" id="' + value.ID + '">';
                    html += '<div class="cardimg">';
                    html += '<img class="card-img-top" src="/Content/Data/Map/' + value.HaritaID + '.jpg" >';
                    html += '</div>';
                    html += '<div class="card-body">';
                    html += '<h6 class="card-title">' + value.Map + '</h6>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                html += '</div>';
                $('.modal-body').html(html);
                $('.card-img-top').error(function () {
                    $(this).attr('src', '/Content/img/map.png');
                });
                $('.modal-body .card').click(function () {
                    var id = $(this).attr('id');
                    parent.location = '/main.html?MapID=' + id;
                });
                Yukleniyor(0);
            },
            error: function () {
                Hata("Hata oluştu. Lütfen tekrar deneyiniz");
            }
        });
    } else {
        $('#exampleModal').modal('hide');
    }
}
$('*').click(function (e) {
    if (!$(e.target).is('.rtls_map') && !$(e.target).is('.rtls_map *') && !$(e.target).is('.MainMenu') && !$(e.target).is('.MainMenu *') && !$(e.target).is('.mapDegistir') && !$(e.target).is('.mapDegistir *') ) {
        map(0);
    }
});
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function playAudio(i) {
    if (i == 1) {
        var alarm = document.getElementById("AlarmSound");
        alarm.play();
    } else if (i == 2) {
        var uyari = document.getElementById("UyariSound");
        uyari.play();
    }
}
function pauseAudio(i) {
    if (i == 1) {
        var alarm = document.getElementById("AlarmSound");
        alarm.pause();
    } else if (i == 2) {
        var uyari = document.getElementById("UyariSound");
        uyari.pause();
    }
} 
function cift(i) {
    if (i < 10) {
        return '0' + i;
    } else {
        return i;
    }
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}