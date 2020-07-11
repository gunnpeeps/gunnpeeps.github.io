
class Slider {
    constructor(sliderClass){

        this.timeBetweenSlides = 6000;
        this.slideTime = 1000;

        this.slides = $(`.${sliderClass}>img`);

        this.currSlide = Math.floor(this.slides.length * Math.random());
        console.log(this.currSlide);
        this.setMargins(this.currSlide);

        setInterval(() => {
            if(!this.nextSlideQd){
                this.nextSlide();
                this.nextSlideQd = true;
            }
        }, this.timeBetweenSlides);

        this.nextSlideQd = false;


        return this;
    }

    setMargins(n){
        for(let i = 0; i < this.slides.length; i++){
            this.slides.eq(i).css({
                marginLeft: ((i - n) * 100) + "vw"
            })
        }
    }

    animateMargins(n) {
        if (!this.nextSlideQd) {
            this.nextSlideQd = true;
            for (let i = 0; i < this.slides.length; i++) {
                this.slides.eq(i).animate({
                    marginLeft: ((i - n) * 100) + "vw"
                }, this.slideTime, () => {
                    this.nextSlideQd = false;
                })
            }
        }
    }

    nextSlide(){
        
        if(!this.nextSlideQd){
        
            if (this.currSlide >= this.slides.length - 1) {
                this.currSlide = 0;
                this.setMargins(this.currSlide);
            }

            this.currSlide++;
            this.animateMargins(this.currSlide);
            this.nextSlideQd = true;
        }
        
    }

    goToSlide(n){
        if(!this.nextSlideQd){
            this.currSlide = n;
            this.animateMargins(n);
            this.nextSlideQd = true;
        }
    }

    prevSlide(){
        if (!this.nextSlideQd) {
            if (this.currSlide <= 0) {
                this.currSlide = this.slides.length-1;
                this.setMargins(this.currSlide);
                
            }

            this.currSlide--;
            this.animateMargins(this.currSlide);
            
            this.nextSlideQd = true;
        }
    }

}

let slider1;

$(function () {

    slider1 = new Slider("slider-1")
    $(".left-arr").click(() => {
        slider1.prevSlide();
    })
    $(".right-arr").click(() => {
        slider1.nextSlide();
    })

});
