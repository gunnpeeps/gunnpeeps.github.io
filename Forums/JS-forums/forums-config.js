var slider1;

$(function () {
    let g1 = new Gradient("gradient-wrapper-heading");
    let g2 = new Gradient("gradient-wrapper-header");
    let gs = new GradientGroup([g1, g2]);
    gs.update();
    let timer = new Timed(2000, [gs]);
    timer.run();

});
