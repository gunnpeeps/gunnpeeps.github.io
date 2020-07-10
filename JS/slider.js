
class Slider {
    constructor(sliderClass){

        this.currSlide = 1;
        this.timeBetweenSlides = 3000;
        this.slideTime = 1000;

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

    setMargins() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides.eq(i).animate({
                marginLeft: ((i - this.currSlide) * 100) + "vw"
            }, this.slideTime)
        }
    }

    nextSlide(){

        if (this.currSlide >= this.slides.length) {
            this.currSlide = 1;
            this.resetMargins();
        }

        this.setMargins();
        this.currSlide++;

    }

}

let slider1;

$(function () {

    slider1 = new Slider("slider-1")

});
