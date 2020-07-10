
class Slider {
    constructor(sliderClass){

        this.currSlide = 1;
        this.timeBetweenSlides = 8000;
        this.slideTime = 2500;

        this.slides = $(`.${sliderClass}>img`);
        this.resetMargins();

        let interval = setInterval(() => {
            this.nextSlide();
        }, this.timeBetweenSlides);

        return this;
    }

    resetMargins(){
        for(let i = 0; i < this.slides.length; i++){
            this.slides.eq(i).css({
                marginLeft: (i * 100) + "vw"
            })
        }
    }

    nextSlide(){

        if (this.currSlide >= this.slides.length) {
            this.currSlide = 1;

            this.resetMargins();
        }

        this.currSlide++;

        this.slides.animate({
            marginLeft: "-=100vw"
        }, this.slideTime);

    }
}

let slider1;

$(function () {

    slider1 = new Slider("slider-1")

});
