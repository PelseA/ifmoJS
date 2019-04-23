(function() {
    'use strict';
    //получение данных из input
    let get_data = document.getElementById('get_data');
    get_data.addEventListener('click', getInput);

//кнопка do_fight станет видимой когда появится хотябы 2 кота
    function doVisibleButton() {
        let button = document.getElementById('do_fight');
        button.style.visibility = 'visible';
    };

//запись котов в массив
    function createCatsArray() {
        let catsArray = [];
        let elem = document.getElementsByClassName('container_cat');
        for (let i = 0; i < elem.length; i++) {
            let data_cat = [];
            let text_p = elem[i].childNodes;//[h3, h4, p, h4, p, h4, p]=[h3, h4, name, h4, age, h4, weight]
            let name = text_p[2].textContent;
            data_cat.push(name);
            let age = text_p[4].textContent;
            data_cat.push(age);
            let weight = text_p[6].textContent;
            data_cat.push(weight);
            catsArray.push(data_cat);
        }
        if (catsArray.length <= 1) {
            console.log('недостаточно котов для боя');
            return;
        }
        doVisibleButton();
        return catsArray;
    };

    function getInput() {
        let name = document.getElementById('cat_name');
        name = name.value;
        console.log('имя', name);
        let age = document.getElementById('cat_age');
        age = age.value;
        console.log('возраст', age);
        let weight = document.getElementById('cat_weight');
        weight = weight.value;
        console.log('вес', weight);
        let h3_title = document.createElement('h3');
        let h4_name = document.createElement('h4');
        let h4_age = document.createElement('h4');
        let h4_weight = document.createElement('h4');

        let p_name = document.createElement('p');
        let p_age = document.createElement('p');
        let p_weight = document.createElement('p');


        let text_name = name;
        let text_age = age;
        let text_weight = weight;

        h3_title.innerText = 'Вы создали котика';
        h4_name.innerText = 'Имя котика: ';
        h4_age.innerText = 'Возраст котика: ';
        h4_weight.innerText = 'Вес котика: ';

        p_name.innerText = text_name;
        p_age.innerText = text_age;
        p_weight.innerText = text_weight;

        let container_cat = document.createElement('div');
        container_cat.classList.add('container_cat');
        container_cat.appendChild(h3_title);
        container_cat.appendChild(h4_name);
        container_cat.appendChild(p_name);
        container_cat.appendChild(h4_age);
        container_cat.appendChild(p_age);
        container_cat.appendChild(h4_weight);
        container_cat.appendChild(p_weight);

        let cat_hero = document.getElementById('cat_hero');
        cat_hero.appendChild(container_cat);
        createCatsArray();
    };

    //создаем объекты класса Cat
    let start = document.getElementById('do_fight');
    start.addEventListener('click', doFight);
    //выводим результат на экран после боя
    function showResult(){
        //console.log(doFight()); //результат работы этой функции
        let result = doFight();
        console.log(result);
    }
    function doFight() {
        //console.log(createCatsArray()); //результат работы этой функции
        let catsArray = createCatsArray();
        console.log(catsArray);
            //пока сделаем для двух котиков
        let anketa_cat1 = catsArray[0];
        let anketa_cat2 = catsArray[1];
        let cat1 = new Cat(anketa_cat1[0], anketa_cat1[1], anketa_cat1[2]);
        let cat2 = new Cat(anketa_cat2[0], anketa_cat2[1], anketa_cat2[2]);
        console.log(cat1);
        console.log(cat2);

        //далее выведем на экран инфо о силе котов
        let new_strength = document.getElementById('new_strength');

        let h4_strength1 = document.createElement('h4');
        let h4_strength2 = document.createElement('h4');
        let p_strength1 = document.createElement('p');
        let p_strength2 = document.createElement('p');
        let text_strength1 = cat1._strength;
        let text_strength2 = cat2._strength;
        h4_strength1.innerText = 'Котику присвоена сила: ';
        h4_strength2.innerText = 'Противнику присвоена сила: ';
        p_strength1.innerText = text_strength1;
        p_strength2.innerText = text_strength2;
        let set_strength1 = document.createElement('div');
        let set_strength2 = document.createElement('div');
        set_strength1.classList.add('set_strength');
        set_strength2.classList.add('set_strength');
        set_strength1.appendChild(h4_strength1);
        set_strength2.appendChild(h4_strength2);
        set_strength1.appendChild(p_strength1);
        set_strength2.appendChild(p_strength2);
        new_strength.appendChild(set_strength1);
        new_strength.appendChild(set_strength2);

        cat1.fight(cat2);

        return cat1, cat2;
    }



}());
