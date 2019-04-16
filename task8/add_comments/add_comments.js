let generate = document.getElementById('generate_comment');
generate.addEventListener('click', addComment);

function addComment(){
//let inner_name = document.getElementById('user_name').value;
//console.log(inner_name);
    let container = document.getElementById('add_comment');
    let new_comment = document.createElement('div');//в него соберем имя, дату и число
    //и его со всем содержимым потом вставим на страницу (в conteiner)
    new_comment.classList.add('new_comment');

    let name = document.createElement('p');
    name.classList.add('name_img');
    let img_name = document.createElement('img');
    img_name.setAttribute('src', 'image/ikonka.png');
    img_name.classList.add('img_name');

    let inner_name = document.getElementById('user_name').value;//получили значение из инпута
    name.innerText = inner_name;//вставили текст-имя
    name.appendChild(img_name);//вставили фотку; в другой последоват - текст перезатрет иконку
    new_comment.appendChild(name);

    let date_string = document.createElement('p');
    date_string.classList.add('date');
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let months = ["01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12"];

    let nowDate = new Date();
    let fullNowDate = nowDate.getDate() + "." + months[nowDate.getMonth()] +
        "." + nowDate.getFullYear() + ", " + days[nowDate.getDay()]+ ', '
        + nowDate.getHours()+':'+ nowDate.getMinutes();
    date_string.innerText = fullNowDate;
    new_comment.appendChild(date_string);

    let comment = document.createElement('p');
    let inner_comment = document.getElementById('comment').value;
    comment.innerText = inner_comment;
    new_comment.appendChild(comment);
//найдем последний комментарий, чтобы вставить новый перед ним
    let last_comment = document.getElementsByClassName('new_comment');//придет массив так как getElementS
    last_comment = last_comment[0];
    let allSections = document.querySelectorAll('section');
    section = allSections[0];
    section.insertBefore(new_comment, last_comment);
};

//https://learn.javascript.ru/modifying-document
