class Timed {

    constructor(time,objs){

        this.has = false;
        if(objs){
            this.objs = objs;
            for(let obj of this.objs){
                obj.setParent(this);
            }
            this.has = true;
        }

        this.nextQd = false;
        this.timeBetween = time;
        this.started = false;

        this.partOf = false;
        this.runningIndependently = true;

    }

    run(){
        if(!this.started){
            setInterval(() => {
                if (this.available()) {
                    this.update();
                    this.setAvailable(true);
                }
            }, this.timeBetween);
            this.started = true;
        }
    }

    available(){
        return !this.nextQd;
    }

    setAvailable(bool){
        this.nextQd = !bool;
    }

    setParent(obj){
        this.parent = obj;
        this.partOf = true;
    }

    update(){
        if(this.has){
            for(let obj of this.objs){
                obj.indenpendent(false);
                obj.update();
                obj.indenpendent(true);
            }
        }
    }

    updateAllBut(obj2){
        if (this.has) {
            for (let obj of this.objs) {
                if(obj != obj2){
                    obj.update();
                }
            }
        }
    }

    indenpendent(bool){
        if(bool === false || bool === true){
            this.runningIndependently = bool;
        } else {
            return this.runningIndependently;
        }
    }

}