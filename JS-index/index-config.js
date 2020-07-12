var slider1;

$(function () {
    let g = new Gradient("gradient-wrapper-heading");
    slider1 = new Slider("slider-1", new GradientGroup([g]));

    leftArr = $(".left-arr");
    rightArr = $(".right-arr");

    leftArr.on("click", () => {
        slider1.prevSlide();
    });
    rightArr.on("click", () => {
        slider1.nextSlide();
    });

});
