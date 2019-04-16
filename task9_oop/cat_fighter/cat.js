class Cat{
    //сеттеры
    set name(name){
        if(name.length < 2){
            return;
        }
        this._name = name;
    }
    set age(yearsOld){
        if(yearsOld < 1){
            console.log('котик не прошел возрастной отбор');
            return;
        }
        this._age = yearsOld;
    }
    set weight(kg){
        if(kg < 2){
            console.log('котик не прошел весовой отбор');
            return;
        }
        this._weight = kg;
    }
    set strength(number){
        if(number < 2){
            console.log('сила должна быть не менее 2 единиц');
            return;
        }
        this._strength = number;
    }
    //геттеры
    get name(){
        return this._name;
    }
    get age(){
        return this._age;
    }
    get weight(){
        return this._weight;
    }
    get strength(){
        return this._strength;
    }
};