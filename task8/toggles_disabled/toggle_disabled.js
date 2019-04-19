(function () {
    'use strict';
//СМЕНА ЦВЕТА
let radio_button = document.getElementsByName('bg');
for (let i = 0; i < radio_button.length; i++){
   radio_button[i].addEventListener('click', changeColor);
}
function changeColor(){
    let color = document.querySelector('input[name="bg"]:checked').value;
    let fieldset = document.getElementById('change_color_fieldset');
    fieldset.style.background = color;
}
//БЛОКИРОВКА и РАЗБЛОКИРОВКА ввода текста
let toggle = document.getElementById('toggle');
toggle.addEventListener('click', addDisabled);
function addDisabled(){
    let input = document.getElementById('input_text');
    input.disabled = !this.checked;
}



}());