

let generate = document.getElementById('generate_field');
generate.addEventListener('click', generateField);
function generateField(){
    let count_field = document.getElementById('count_field').value;
    if (!count_field || count_field > 9 || count_field < 3) {
        document.getElementById('message');
        let attention = document.createElement('p');
        attention.innerText = 'Вы ввели неверное число';
        message.appendChild(attention);
    }else {
        let elem = document.getElementById("message");//сначала уберем строчку
        //'Вы ввели неверное число' если до этого она зааппендилась
        elem.parentNode.removeChild(elem);
        let prize_table = document.getElementById('prize_table');
        prize_table.setAttribute('border', '1');
        let caption = prize_table.createCaption();
        caption.innerText = 'Угадай, где приз!';
        for (let i = 1; i <= count_field; i++) {
            let row = prize_table.insertRow();
            for (let j = 1; j <= count_field; j++) {
                cell = row.insertCell();
                let prize = document.createElement('input');
                prize.classList.add('button');//класс кнопки 'button'
                prize.setAttribute('type', 'button');
                prize.setAttribute('value', '???');
                cell.appendChild(prize);
            }
        }
        let allButtons = document.querySelectorAll('.button');//по классу получаем все кнопки
        // с потенциальным призом
        for (let k = 0; k < allButtons.length; k++) {
            allButtons[k].addEventListener('click', openCell);//событие и имя функции
        }
    }
};
let attempt = 3;
let prizes = [':(', 'car', ':(', ':(', '$100', '$500' ];
let rand = Math.floor(Math.random() * prizes.length);//задали подарок для первой попытки
function openCell(){
        this.classList.toggle('open_cell');//элемент, на который кликаем становится this
        let yourPrize = prizes[rand];
        this.setAttribute('value', yourPrize);
        if(yourPrize === prizes[1] || yourPrize === prizes[4] ||yourPrize === prizes[5]){
            let allButtons = document.querySelectorAll('.button');
            for(let k = 0; k < allButtons.length; k++){
                allButtons[k].removeEventListener('click', openCell);//отменяем событие для ВСЕХ cell
            }
            document.getElementById('message2');
            let attention2 = document.createElement('a');
            attention2.setAttribute('href', '');//если не ставить # страница обновится
            attention2.innerText = 'Поздравляем! Вы выиграли ' + yourPrize;
            message2.appendChild(attention2);
            document.body.style.background = 'lightgreen';//меняем цвет фона когда выиграли
        }
    rand = Math.floor(Math.random() * prizes.length);//поменяли подарок для следующего клика
    attempt--;
    if(attempt === 0) {
        let allButtons = document.querySelectorAll('.button');
        for(let k = 0; k < allButtons.length; k++){
            allButtons[k].removeEventListener('click', openCell);//отменяем событие для ВСЕХ cell
        }
        document.getElementById('message2');
        let attention2 = document.createElement('a');
        attention2.setAttribute('href', '');//если не ставить # страница обновится
        attention2.innerText = 'Попробовать снова';
        message2.appendChild(attention2);
    }
};

