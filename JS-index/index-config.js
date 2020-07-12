var slider1;

$(function () {
    let g1 = new Gradient("gradient-wrapper-heading");
    let g2 = new Gradient("gradient-wrapper-header");
    slider1 = new Slider("slider-1", new GradientGroup([g1,g2]));

    leftArr = $(".left-arr");
    rightArr = $(".right-arr");

    leftArr.on("click", () => {
        slider1.prevSlide();
    });
    rightArr.on("click", () => {
        slider1.nextSlide();
    });

});
