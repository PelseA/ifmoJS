let articles = [
    {
        id: 1,
        title: "JS",
        description: "Описание 1",
        author: "Mike"
    },
    {
        id: 2,
        title: "PHP",
        description: "Описание 2",
        author: "Mike"
    },
    {
        id: 3,
        title: "HTML",
        description: "Описание 3",
        author: "Alex"
    },
    {
        id: 4,
        title: "Базы Данных",
        description: "Описание 4",
        author: "Peter"
    }
];
function createTable(array){
    let table = document.getElementById('table_id');
    table.setAttribute('border', '1');
    let caption = table.createCaption();//создали заголовок таблице
    caption.innerText = 'Статьи';//вставили текст в заголовок
    let row = table.insertRow(0); //вставили ряд для шапки
    let firstIndex = array[0];//в каждом индексе ключи одинаковые, возьмем первый индекс
    let keys = Object.keys(firstIndex);//массив с названиями ключей, нужны для названия столбцов
    for(let i = 0; i < keys.length; i++){
            let cell = 'cell' + '_' + keys[i];
            cell = row.insertCell();//в ряд вставляем ячейки там будут названия столбцов
            cell.innerText = keys[i];//вставили название столбца
    }
    for (let i = 0; i < array.length; i++) {//заполним таблицу содержимым
        let every_row = table.insertRow();
        let obj = array[i];
        for(prop in obj){
            let cell = 'cell' + '_' + keys[i];
            cell = every_row.insertCell();
            cell.innerText = obj[prop];
        }
    }
};
createTable(articles);


