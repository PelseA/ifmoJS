class Cat{
    constructor(name, age, weight, strength){
        this._name = name;
        this._age = age;
        this._weight = weight;
        this._strength = Math.floor(Math.random() * (20 - 2)) + 2;//сила от 2 до 20
    }

    fight(enemyCat){
        //механизм драки котов
        //в зависимости от их веса возраста и силы
        if (!this._weight || !this._age || !enemyCat._weight || !enemyCat._age){
            console.log("Бой невозможен! Передайте все параметры");
            return;
        }
        this._life = 10;
        enemyCat._life = 10;
        this._message =[];
        console.log(this._name, 'напал на кота по имени', enemyCat.name);
        if (this.age < enemyCat._age){
            this._life -=3;
            enemyCat._life += 3;
            let text1 = this._name + ': жизнь = ' + this._life +';'+
            enemyCat.name + ': жизнь = ' + enemyCat._life;
            this._message.push(text1);
        }
        if (this.weight < enemyCat._weight){
            this._life -=2;
            enemyCat._life += 3;
            let text2 = this._name + ': жизнь = ' + this._life +';'+
                enemyCat.name + ': жизнь = ' + enemyCat._life;
            this._message.push(text2);
        }
        if (this.strength < enemyCat._strength){
            this._life -=4;
            enemyCat._life += 3;
            let text3 = this._name + ': жизнь = ' + this._life +';'+
                enemyCat.name + ': жизнь = ' + enemyCat._life;
            this._message.push(text3);
        }
        if (this.strength === enemyCat._strength){
            this._life -= 2;
            enemyCat._life -=2;
            let text3 = this._name + ': жизнь = ' + this._life +';'+
                enemyCat.name + ': жизнь = ' + enemyCat._life;
            this._message.push(text3);
        }
        if (this._life > enemyCat._life){
            console.log('победа');
            return true;
        }
        console.log('проигрыш');
        return false;
        //return this._life, enemyCat._life;
        //console.log(this.name,'закончил со счетом',this._life);
        // console.log(enemyCat.name, 'закончил со счетом', enemyCat._life);
    }

    get name(){
        return this._name;
    }
    get age(){
        if (this._age <= 1){
            console.log('К бою допускаются котики от 2 лет');
            return;
        }
        return this._age;
    }
    get weight(){
        if (this._weight < 2){
            console.log('К бою допускаются котики от 2 кг');
            return;
        }
        return this._weight;
    }
    get strength(){
        return this._strength;
    }
}

//new Cat();//сюда передаем значения name, age, weight, strength