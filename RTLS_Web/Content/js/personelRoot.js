var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var oran
$(function () {

    $("#icerik").draggable();
    $("#slider").slider({
        range: "max",
        min: 1,
        max: 100,
        value: 5,
        slide: function (event, ui) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            olustur(parseInt(ui.value));
        }
    });
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
    $('#icerik').bind('DOMMouseScroll', function (e) {
        if (e.originalEvent.detail > 0) {
            zoom('+');
        } else {
            zoom('-');
        }
        return false;
    });
    $('#icerik').bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta < 0) {
            zoom('+');
        } else {
            zoom('-');
        }
        return false;
    });
    olustur(1);
});
var currZoom = 1;
function zoom(a) {
    if (a == "+") {
        currZoom += 0.01;
    } else {
        currZoom -= 0.01;
    }

    $("#icerik").css("zoom", currZoom);
    $("#icerik").css("-moz-transform", "Scale(" + currZoom + ")");
    $("#icerik").css("-moz-transform-origin", "0 0");
}
var aci = 0;
function rotate(a) {
    if (a == "L") {
        aci += 3;
    } else {
        aci -= 3;
    }
    $("#icerik").rotate(aci);
}
function Default() {
    $("#icerik").rotate(0);
    $("#icerik").css("zoom", 0);
    $("#icerik").css("-moz-transform", "Scale(0)");
    $("#icerik").css("-moz-transform-origin", "0 0");
    $("#icerik").css({ left: '0px', top: '0px' });
}
function olustur(k) {
    var kapsam = k * 10;
    var img = document.getElementById("zemin");
    ctx.drawImage(img, 50, 50);
    var background = new Image();
    background.src = img.src;
    background.onload = function () {
        canvas.width = this.width + 100;
        canvas.height = this.height + 100;
        ctx.drawImage(background, 50, 50);

        var veri = $('#veri').html().split('\n');
        
        var x = null;
        var y = null;
        var x0 = null;
        var y0 = null;
        var html = '';
        var saat1 = '';
        var saat2 = '';
        var d1;
        var d2;
        //console.log(veri.length);
        for (var i = 0; i < veri.length; i++) {
            var dizi = veri[i].split('|');
            d1 = parseFloat(dizi[1]);
            d2 = parseFloat(dizi[2]);
            //if (dizi.length == 3) {
            if (x == null) {
                x = Math.round(d1, 0);
                y = Math.round(d2, 0);
            } else {
                x0 = Math.round(d1, 0);
                y0 = Math.round(d2, 0);
                
                if (x0 <= (x + kapsam) && x0 >= (x - kapsam) && y0 <= (y + kapsam) && y0 >= (y - kapsam)) {
                    saat2 = dizi[0];
                } else {
                    ctx.beginPath();
                    console.log(x + 'x' + y);
                    ctx.moveTo(x, y);
                    ctx.arc(x0, y0, 10, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'green';
                    ctx.strokeStyle = '#003300';
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    x = Math.round(parseFloat(dizi[1]), 0);
                    y = Math.round(parseFloat(dizi[2]), 0);
                    saat1 = dizi[0];
                    html += '<li saat="' + saat2 + ' ' + saat1 + '" x="' + Math.round(parseFloat(dizi[1]), 0) + '" y="' + Math.round(parseFloat(dizi[2]) , 0) + '"><div class="saat">' + saat2 + ' ' + saat1 + '</div></li>';
                }
                if (dizi.length == 4) {

                    ctx.beginPath();
                    
                    ctx.moveTo(x, y);
                    ctx.arc(x0, y0, 10, 0, 2 * Math.PI, false);
                    var d = dizi[3].split(',');
                    if (d[0] == '1') {
                        ctx.fillStyle = 'red';
                        ctx.strokeStyle = '#790505';
                    } else if (d[2] == '1') {
                        ctx.fillStyle = '#efefef';
                        ctx.strokeStyle = '#ccc';
                    } else if (d[1] == '1') {
                        ctx.fillStyle = 'yellow';
                        ctx.strokeStyle = '#ffbd05';
                    }
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    x = Math.round(parseFloat(dizi[1]) , 0);
                    y = Math.round(parseFloat(dizi[2]) , 0);
                    saat1 = dizi[0];
                    if (d[0] == '1') {
                        html += '<li class="btn1" saat="' + saat2 + ' ' + saat1 + '" x="' + Math.round(parseFloat(dizi[1]) , 0) + '" y="' + Math.round(parseFloat(dizi[2]) , 0) + '"><div class="saat">' + saat2 + ' ' + saat1 + '</div></li>';
                    } else if (d[2] == '1') {
                        html += '<li class="btn2" saat="' + saat2 + ' ' + saat1 + '" x="' + Math.round(parseFloat(dizi[1]), 0) + '" y="' + Math.round(parseFloat(dizi[2]), 0) + '"><div class="saat">' + saat2 + ' ' + saat1 + '</div></li>';
                    } else if (d[1] == '1') {
                        html += '<li class="btn3" saat="' + saat2 + ' ' + saat1 + '" x="' + Math.round(parseFloat(dizi[1]) , 0) + '" y="' + Math.round(parseFloat(dizi[2]) , 0) + '"><div class="saat">' + saat2 + ' ' + saat1 + '</div></li>';
                    }
                }
            }
            //}
        }
        
        $('.kadran').html(html);
        var $target = $('body');
        var w = $(window).width();
        var h = $(window).height();

        $('.kadran li').mouseover(function () {
            $('.kadran .saat').hide();
            $('.saat', this).show();
        }).mouseout(function () {
            $('.kadran .saat').hide();
        });
        $('.kadran li').click(function () {
            $("#icerik").css({ left: '0px', top: '0px' });
            var L = parseInt($(this).attr('x'));
            var T = parseInt($(this).attr('y'));
            w = w / currZoom;
            h = h / currZoom;
            $target.scrollTo({ left: L - (w / 2) + 'px', top: T - (h / 2) + 'px' }, 500);
            $('.kisi').css({ left: (L - 10) + 'px', top: (T - 10) + 'px' });
            $('.kisi .saat').html($(this).attr('saat'));
            $('.kisi').show();
        });
    }
}