(function() {
    'use strict';
    let goods = {
        guitar: {
            title: "Гитара",
            price: 1200,
            count: 40
        },
        piano: {
            title: "Пианино",
            price: 3000,
            count: 30
        },
        flute: {
            title: "Флейта",
            price: 900,
            count: 50
        },
        drum: {
            title: "Барабаны",
            price: 2700,
            count: 12
        },
        harp: {
            title: "Арфа",
            price: 3400,
            count: 5
        }
    };
    // 1. Написать функцию со следующими аргументами: объект, from (значение от), to (значение до).
    // Функция должна вернуть объект с товарами, цены которых лежат в диапазоне от значения from до значения to.
    // Пример вызова функции getGoods(goods, 2000, 3000); в данном случае функция должна вернуть все товары,
    // у которых цена в диапазоне от 2000 до 3000.
    function priceRange(object, from, to) {
        let tempObj;
        let suitGoodsArr = [];
        let suitGoods;
        for (let prop in object) {
            tempObj = object[prop];
            if (tempObj.price <= to && tempObj.price >= from) {
                suitGoodsArr.push(tempObj);
                suitGoods = Object.assign({}, suitGoodsArr);//создадим объект из массива
            }
        }
        return suitGoods;
    };
    console.log(priceRange(goods, 2000, 4000));
    // 2. Написать функцию addToCart(obj, title, countToCart) {} , где  obj - объект, title - название товара,
    // count - количество товара, которое нужно добавить в корзину.
    //    Функция ищет товар с указанным названием, если количество позволяет,
    //     то уменьшает количество товара на countToCart, если не позволяет,
    //     то выводит информацию об этом в консоль и завершает работу.
    function addToCart(obj, title, countToCart){
        for (let prop in obj) {
            let tempObj = obj[prop];
            if (tempObj.title === title) {
                if (tempObj.count < countToCart){
                    return "Недостаточно товара";
                }else{
                    console.log('Товар '+title+' количество '+countToCart+' шт. добавлен');
                    obj[prop].count = (tempObj.count - countToCart);
                    return obj[prop];
                }
            }
        }
    };
    console.log(addToCart(goods, "Гитара", 4));
    // 3. Напишите функцию, которая отсортирует массив объектов books по значению свойства title.
    let books = [
        { author: 'Толстой', title: 'Война и мир'},
        { author: 'Гончаров', title: 'Обломов'},
        { author: 'Лермонтов', title: 'Герой Нашего Времени'}
    ];
    function sortBooks (arr, title){
        for (let i = 0; i < arr.length; i++ ){
            if(arr[i].title === title){
                return arr[i];
            }
        }
    };
    console.log(sortBooks (books,'Герой Нашего Времени'));
    // 4. Создайте объект с днями недели. Ключами в нем должны служить номера дней от начала недели
    // (понедельник - первый и т.д.).
    // Выведите на экран текущий день недели.
    let days = {
        1: 'понедельник',
        2: 'вторник',
        3: 'среда',
        4: 'четверг',
        5: 'пятница',
        6: 'суббота',
        7: 'воскресенье'
    };
    function getNameOfDay(object){
        let date = new Date();
        let day = date.getDay();
        for (let prop in object){
            if (day === +prop){
                return object[prop];
            }
        }
    };
    console.log(getNameOfDay(days));


}());