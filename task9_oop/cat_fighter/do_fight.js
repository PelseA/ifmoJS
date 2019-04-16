let Murzik = new Cat();
Murzik.name = "Мурзик";
Murzik.age = 4;
Murzik.strength = 10;
Murzik.weight = 4;

let Barsik = new Cat();
Barsik.name = "Барсик";
Barsik.age = 2;
Barsik.strength = 12;
Barsik.weight = 4;

let Fedya = new Cat();
Fedya.name = "Федька";
Fedya.age = 6;
Fedya.strength = 7;
Fedya.weight = 5;


let fight = new Fight();
fight.addCatsForFight(Fedya);
fight.addCatsForFight(Barsik);
fight.addCatsForFight(Murzik);

fight.fightCats();


