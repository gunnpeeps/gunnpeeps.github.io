var slider1;

$(function () {
    let g1 = new Gradient("gradient-wrapper-heading");
    let g2 = new Gradient("gradient-wrapper-header");
    let gs = new GradientGroup([g1,g2]);
    gs.update();
    let slider1 = new Slider("slider-1");
    let timer = new Timed(8000,[slider1,gs]);
    timer.run();

    leftArr = $(".left-arr");
    rightArr = $(".right-arr");

    leftArr.on("click", () => {
        slider1.prevSlide();
    });
    rightArr.on("click", () => {
        slider1.nextSlide();
    });

});
