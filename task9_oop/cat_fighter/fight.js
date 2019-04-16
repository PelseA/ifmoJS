class Fight {
    constructor(){
        this._maxSize = 2;
        this._readyCats =[];
    }

    addCatsForFight(cat) {
        if (!(cat instanceof Cat)) {
            console.log("Котик не является объектом Cat");
            return;
        }
        if (this._readyCats.length === this._maxSize) {
            console.log("нет места для ", cat.name);
            return;
        }
        this._readyCats.push(cat);
        console.log(this._readyCats);
    }
    // showReadyCats(){
    //
    // }

    fightCats() {
        if (!this._readyCats.length) {
            console.log("нет котов для битвы");
            return;
        }
        let score_cat1 = 0;
        let score_cat2 = 0;
        for(let i = 0; i < this._readyCats.length; i++) {
            if(this._readyCats[i].strength > this._readyCats[i+1].strength &&
                this._readyCats[i].strength !== this._readyCats[i+1].strength){
                score_cat1 += 2 ;
            }
            score_cat2 += 2;
            if(this._readyCats[i].weight > this._readyCats[i+1].weight &&
                this._readyCats[i].weight !== this._readyCats[i+1].weight){
                score_cat1 += 1;
            }
            score_cat2 += 1;
            if(this._readyCats[i].age > this._readyCats[i+1].age &&
                this._readyCats[i].age !== this._readyCats[i+1].age){
                score_cat1 += 3;
            }
            score_cat2 += 3;
            if(score_cat1 > score_cat2 && score_cat1 !== score_cat2){
                console.log('со счетом '+score_cat1 +' : '+score_cat2 +' победил ', this._readyCats[i].name);
                return;
            }
            if(score_cat1 < score_cat2 && score_cat1 !== score_cat2) {
                console.log('со счетом ' + score_cat2 + ' : ' + score_cat1 + ' победил ', this._readyCats[i + 1].name);
                return;
            }
            console.log('со счетом ' + score_cat2 + ' : ' + score_cat1 + ' бой закончился вничью');
            return;
        }
    }

}