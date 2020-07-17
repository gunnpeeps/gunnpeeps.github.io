class Gradient extends Timed {

    constructor(gradientID,parent){
        super(8000);
        this.gradient = $(`#${gradientID}`);
        this.gradientbackup = $(`#${gradientID}-backup`);

    }

    changeColor(){
        if(!this.nextQd){
            let h = Math.floor(360 * Math.random());
            let s = []; for(let i = 0; i < 3; i++) s[i] = Math.floor(40 + 10*i + 40 * Math.random()); 
            let strTo = `linear-gradient(${Math.floor(360 * Math.random())}deg, hsla(${h},${s[0]}%,50%,1) 0%, hsla(${(h + 30) % 360},${s[0]}%,50%,1) 35%, hsla(${(h + 60) % 360},${s[0]}%,50%,1) 100%)`;

            this.changeTo(strTo);
            this.nextQd = false;
        }
    }

    update(){
        this.changeColor();
    }

    changeTo(strTo){
        if (!this.nextQd) {
            this.gradientbackup.css("background", strTo);
            this.gradientbackup.fadeTo(300, 1.0, () => {
                this.gradient.css("background", strTo);
                this.gradientbackup.fadeOut(0);
                this.nextQd = false;
            })
        }
    }
}


class GradientGroup extends Timed {
    constructor(gradients) {
        super(8000);
        this.gradients = gradients;
    }
    changeColor() {
         if (!this.nextQd) {
            let h = Math.floor(360 * Math.random());
            let s = [];
            for (let i = 0; i < 3; i++) s[i] = Math.floor(40 + 10 * i + 40 * Math.random());
            let strTo = `linear-gradient(${Math.floor(360 * Math.random())}deg, hsla(${h},${s[0]}%,50%,1) 0%, hsla(${(h + 30) % 360},${s[0]}%,50%,1) 35%, hsla(${(h + 60) % 360},${s[0]}%,50%,1) 100%)`;

            for(let g of this.gradients){
                g.changeTo(strTo);
            }
            this.nextQd = false;
        }

    }

    update(){
        this.changeColor();
    }
}
