//1. Написать функцию сравнения двух массивов.
// Функция принимает на вход два массива, сравнивает их и возвращает true,
// если массивы равны и false, если не равны.
let fruits = ['apple', 'orange', 'lemon'];
let meals = ['apple', 'orange', 'lemon'];
let berries = ['blueberry', 'strawberry', 'blackberry', 'cranberry'];
let numStr = ['1', '2', '3', '4'];
let num =[1, 2, 3, 4];
let string = 'Hello';

function matchArray(arr1, arr2) {
    if (!arr1 || !arr2) {
        console.log('задайте два массива');
        return;
    }
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        console.log('задайте массивы');
        return;
    }
    if (arr1.length !== arr2.length) {
        console.log('массивы не равны');
        return;
    }
    else {
        for (let j = 0; j < arr1.length; j++) {//сравнит столько раз, сколько элементов в массиве
            for (let i = 0; i < arr1.length; i++) {//на каждой итерации(j) будут сравниваться элементы массивов под индексом i
                if (arr1[i] === arr2[i]) {
                } else {
                    console.log('массивы НЕравные');
                    return;
                }
            }
            console.log('массивы равные');
            return true;
        }
    }
};
matchArray();
//2. Дано натуральное число N. Вычислите сумму его цифр,
// используя рекурсию (строки, массивы и циклы использовать запрещено).
function sumEvery(num, temp = 0) {
    if (!num || num === 0) {
        console.log('введите число больше 0');
        return;
    };
        n = num % 10; //сохранили в n последнюю цифру заданного числа
        sum = n + temp;
        if( num < 10){
            console.log('сумма равна ' + sum);
            return;
        }
        sumEvery((num - n)/10, sum);

};
sumEvery(5);
// 3. Напишите функцию range, принимающую три аргумента, два обязательных: начало и конец диапазона,
//     третий аргумент - необязательный (если он не задан, шаг равен единице) – шаг для построения массива.
//     Функция возвращает массив, который содержит все числа из него, включая начальное и конечное.
//     необязательный. Например, Вызов функции range(1, 10, 2) должен будет вернуть [1, 3, 5, 7, 9].
function createArr(start, final, step = 1) {
    if(!start || !final || final < start) {
        console.log('задайте численный диапазон массива от меньшего к большему');
        return;
    }else {
        let array = [start];
        while (start < final && (start+step) <= final) {
            array.push(start+=step);
        }
        console.log(array);
        return;
    }
}
createArr(2, 16, 3);
//4. Напишите функцию,  которая в зависимости от переданного в нее целочисленного аргумента count,
//будет выводить слово «товар» в нужно форме («12 товаров», но «22 товара» и тд).
function rightWrite(count) {
    if(!count){
        console.log('в корзине пусто');
        return;
    }
    let needArr = [];
    countArr = count;
    while (countArr > 0) {
        needArr.unshift(countArr % 10);
        countArr = countArr / 10 | 0;
    }
    let i = needArr.length;
    if (needArr[i - 1] === 1 && needArr[i - 2] === 1){
        console.log(count +' товаров');
        return;
    }
    if([2, 3, 4].indexOf(needArr[i-1]) !== -1 && needArr[i-2] !== 1){
        console.log(count +' товара');
        return;
    }
    if(count % 10 === 1){
        console.log(count +' товар');
        return;
    }else{
        console.log(count +' товаров');
        return;
    }
}
rightWrite(71);





