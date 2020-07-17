class Slider extends Timed{
  constructor(sliderClass) {
    super(8000);

    this.slides = $(`.${sliderClass}>img`);
    this.currSlide = Math.floor(this.slides.length * Math.random());
    this.setMargins(this.currSlide);

    setInterval(() => {
      //if (!this.nextQd) {
        this.nextSlide();
        //this.nextQd = true;
      //}
    }, this.timeBetween);

    this.nextQd = false;

    return this;
  }

  setMargins(n) {
    if (!this.nextQd) {
        this.nextQd = true;

        if (this.indenpendent() && this.partOf) {
          this.parent.updateAllBut(this);
        }

        for (let i = 0; i < this.slides.length; i++) {
            this.slides.eq(i).css({
                marginLeft: ((i - n) * 100) + "%"
            })
            this.nextQd = false;
        }
    }
  }

  animateMargins(n) {
    if (!this.nextQd) {
        this.nextQd = true;
        if (this.indenpendent() && this.partOf) {
          this.parent.updateAllBut(this);
        }
        for (let i = 0; i < this.slides.length; i++) {
        this.slides.eq(i).animate({
            marginLeft: ((i - n) * 100) + "%"
        }, this.slideTime, () => {
            this.nextQd = false;
        })
        }
    }
  }

  nextSlide() {
    if (!this.nextQd) {
      
        if (this.currSlide >= this.slides.length - 1) {
        this.currSlide = 0;
        this.setMargins(this.currSlide);
        }

        this.currSlide++;
        this.animateMargins(this.currSlide);
        this.nextQd = true;
    }

  }

  update(){
    this.nextSlide();
  }

  goToSlide(n) {
    if (!this.nextQd) {
      
      this.currSlide = n;
      this.animateMargins(n);
      this.nextQd = true;
    }
  }

  prevSlide() {
    if (!this.nextQd) {
    if (this.currSlide <= 0) {
      this.currSlide = this.slides.length - 1;
      this.setMargins(this.currSlide);
    }

    this.currSlide--;
    this.animateMargins(this.currSlide);
    }

  }

}
