class Slider {
  constructor(sliderClass) {

    this.currSlide = 2;
    this.timeBetweenSlides = 8000;
    this.slideTime = 1000;

    this.slides = $(`.${sliderClass}>img`);
    this.setMargins(this.currSlide);

    setInterval(() => {
      if (!this.nextSlideQd) {
        this.nextSlide();
        this.nextSlideQd = true;
      }
    }, this.timeBetweenSlides);

    this.nextSlideQd = false;

    return this;
  }

  setMargins(n) {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides.eq(i).css({
        marginLeft: ((i - n) * 100) + "vw"
      })
    }
  }

  animateMargins(n) {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides.eq(i).animate({
        marginLeft: ((i - n) * 100) + "vw"
      }, this.slideTime, () => {
        this.nextSlideQd = false;
      })
    }
  }

  nextSlide() {

    if (this.currSlide >= this.slides.length - 1) {
      this.currSlide = 0;
      this.setMargins(this.currSlide);
    }

    this.currSlide++;
    this.animateMargins(this.currSlide);

  }

  goToSlide(n) {
    if (!this.nextSlideQd) {
      this.nextSlideQd = true;
      this.currSlide = n;
      this.animateMargins(n);
    }
  }

  prevSlide() {

    if (this.currSlide <= 0) {
      this.currSlide = this.slides.length - 1;
      this.setMargins(this.currSlide);
    }

    this.currSlide--;
    this.animateMargins(this.currSlide);


  }

}

var slider1;

$(function() {

  slider1 = new Slider("slider-1");

  leftArr = $(".left-arr");
  rightArr = $(".right-arr");

  leftArr.on("click", () => {
    slider1.prevSlide();
  });
  rightArr.on("click", () => {
    slider1.nextSlide();
  });

});
