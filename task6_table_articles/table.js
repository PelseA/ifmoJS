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
    let cell1 = row.insertCell(0);//в ряд вставляем ячейки там будут названия столбцов
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let firstIndex = array[0];//в каждом индексе ключи одинаковые, возьмем первый индекс
    let keys = Object.keys(firstIndex);//массив с названиями ключей, нужны для названия столбцов
        cell1.innerText = keys[0];//вставили название столбца
        cell2.innerText = keys[1];//вставили название столбца
        cell3.innerText = keys[2];//вставили название столбца
        cell4.innerText = keys[3];//вставили название столбца
    for (let i = 0; i < array.length; i++) {
        let every_row = table.insertRow();
        let cell_id = every_row.insertCell();
        let cell_title = every_row.insertCell();
        let cell_desc = every_row.insertCell();
        let cell_name = every_row.insertCell();
            let obj = array[i];
            cell_id.innerText = obj.id;
            cell_title.innerText = obj.title;
            cell_desc.innerText = obj.description;
            cell_name.innerText = obj.author;
    }
};
createTable(articles);
