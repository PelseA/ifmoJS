// 1. Написать функцию поиска в строке указанной подстроки и замены ее на новую.
//     Строку, ее подстроку для замены и новую подстроку вводит пользователь.
(function(){
    'use strict';
    // let str = prompt('Введите строку', 'Я люблю Питер');
    // let strOut = prompt('Что меняем?');
    // let strAdd = prompt('На что меняем?');
    //Хочу, чтоб от регистра не зависело поэтому добавляю флаг i
    let myString = 'Я иду тУда';
    let myStrOut = 'туда';
    let myStrAdd = 'обратно';
    // let newSt = str.replace(/туда/i, strAdd); //так работает
    // console.log(newSt);
    function changeString(str, strOut, strAdd){
        let re = '\/' + strOut + '\/'  + 'i' ; //  /туда/i
        //re = eval('({obj:[' + re + ']})'); // это НЕ помогло
        let newStr;
        newStr = str.replace(re, strAdd); //а так НЕ РАБОТАЕТ :( Дело типе данных re = '/туда/i' ?
        return newStr;
    }
    console.log(changeString(myString, myStrOut, myStrAdd));
// 2. Вводится строка, содержащая буквы, целые неотрицательные числа и иные символы.
//    Написать функцию, которая реализует следующий функционал: требуется все числа,
//    которые встречаются в строке, поместить в отдельный целочисленный массив.
    function numberToArray(string){
        let stringArr = [];
        stringArr = string.split(' ');
        let stringArr2 =[];
        let numberArr = [];
        for(let i = 0; i < stringArr.length; i++){
            stringArr2.push(stringArr[i].replace(',', ''));//в новый массив без запятых
            if (stringArr2[i].search(/[0-9]/) === 0){//ищет числа
                numberArr.push(stringArr2[i]);
            }
        }
        return numberArr;
    }
    let adress = 'дом 48, корпус 9, парадная 7, этаж 4';
    console.log(numberToArray(adress));

// 3. Допустим, пользователь вводит названия городов через пробел.
//     Вы их присваиваете переменной.
//     Переставьте названия так, чтобы они были упорядочены по алфавиту.
    let cities = 'Москва Хабаровск Тула Магадан';
    let cities2 = 'London Paris Moscow Armavir';
    function sortAlfabet(string){
        let Arr = [];
        Arr = string.split(' ');
        Arr.sort();//сортируем значения массива по алфавиту
        let stringNew = Arr.join(', ');//массив переделываем в строку с разделителем ', '
        return stringNew;
    }
    console.log(sortAlfabet(cities2));

}());