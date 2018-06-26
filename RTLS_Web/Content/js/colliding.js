function collision($div1, $div2) {
    var x1 = $div1.offset().left + parseInt($div1.css('borderLeftWidth'), 10);
    var y1 = $div1.offset().top + parseInt($div1.css('borderTopWidth'), 10);
    var h1 = $div1.innerHeight();
    var w1 = $div1.innerWidth();
    var b1 = y1 + h1 - 1;
    var r1 = x1 + w1 - 1;
    var x2 = $div2.offset().left + parseInt($div2.css('borderLeftWidth'), 10);
    var y2 = $div2.offset().top + parseInt($div2.css('borderTopWidth'), 10);
    var h2 = $div2.innerHeight();
    var w2 = $div2.innerWidth();
    var b2 = y2 + h2 - 1;
    var r2 = x2 + w2 - 1;

    return (r1 >= x2 && r2 >= x1 && b1 >= y2 && b2 >= y1);
}
