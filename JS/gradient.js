class Gradient {
    constructor(gradientID){
        this.gradient = $(`#${gradientID}`);
        this.gradientbackup = $(`#${gradientID}-backup`);
    }
    changeColor(){
        let h = Math.floor(360 * Math.random());
        let s = []; for(let i = 0; i < 3; i++) s[i] = Math.floor(40 + 10*i + 40 * Math.random()); 
        let strTo = `linear-gradient(${Math.floor(360 * Math.random())}deg, hsla(${h},${s[0]}%,50%,1) 0%, hsla(${(h + 30) % 360},${s[0]}%,50%,1) 35%, hsla(${(h + 60) % 360},${s[0]}%,50%,1) 100%)`;


        this.gradientbackup.css("background", strTo);
        this.gradientbackup.fadeTo( 500, 1.0, () => {
            this.gradient.css("background", strTo);
            this.gradientbackup.fadeOut(0);
            console.log("DONE");
        })


    }
}
