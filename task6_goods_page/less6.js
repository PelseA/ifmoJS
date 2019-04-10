let goods = {
    guitar: {
        id: 1,
        title: "Гитара",
        price: 1200,
        count: 40,
        img: 'riga.jpg',
    },
    piano: {
        id: 2,
        title: "Пианино",
        price: 3000,
        count: 30,
        img: 'riga1.jpg',
    },
    flute: {
        id: 3,
        title: "Флейта",
        price: 900,
        count: 50,
        img: 'riga2.jpg',
    },
    drum: {
        id: 4,
        title: "Барабаны",
        price: 2700,
        count: 12,
        img: 'riga1.jpg',
    },
    harp: {
        id: 5,
        title: "Арфа",
        price: 3400,
        count: 5,
        img: 'riga2.jpg'
    },
    balalaika: {
        id: 6,
        title: "Балалайка",
        price: 2100,
        count: 10,
        img: 'riga.jpg',
    }
};
function addAbout(object){

    for (let prop in object) {
        object[prop];

    let all_goods = document.getElementById('all_goods');
    all_goods.classList.add("all_goods");
    console.log(all_goods);

    let div_one_good = document.createElement('div');//в нем будет название, картинка и цена
    div_one_good.classList.add("one_good_view");
    div_one_good.setAttribute("id", object[prop].id);

    let name = document.createElement('h2');
    name.innerText = object[prop].title;

    let div_title = document.createElement('div');
    div_title.classList.add("title");
        div_title.appendChild(name);

    let img = document.createElement('img');
    img.setAttribute('src', 'img/'+ goods[prop].img);
    img.classList.add("img");

    let div_img = document.createElement('div');
    div_img.classList.add("picture");
        div_img.appendChild(img);

    let button = document.createElement('button');
    button.classList.add('myButton');
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerText = 'Подробнее о товаре';
        div_img.appendChild(button);
        button.appendChild(link);

    let price = document.createElement('p');
    price.innerText = 'Цена: '+ object[prop].price;

    let div_price = document.createElement('div');
    div_price.classList.add("price");
        div_price.appendChild(price);

    all_goods.appendChild(div_one_good);
    div_one_good.appendChild(div_title);
    div_one_good.appendChild(div_img);
    div_one_good.appendChild(div_price);
    }
}
addAbout(goods);





