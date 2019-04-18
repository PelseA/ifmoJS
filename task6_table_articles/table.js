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
        title: "mySql",
        description: "Описание 3",
        author: "Robert"
    },
    {
        id: 4,
        title: "HTML",
        description: "Описание 4",
        author: "Alex"
    },
    {
        id: 5,
        title: "Базы Данных",
        description: "Описание 5",
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
            cell.classList.add('cell_title');
            cell.setAttribute('id', keys[i]);//установили id, понадобится для сортировки
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

function sortTable(table_id){
    this.table = document.getElementById(table_id);
    let keySort = document.getElementsByTagName('tr');//нам нужен индекс 0 (заголовки)
    keySort[0].addEventListener('click', doSort);
    function doSort(){
        let click = event.target;//та ячейка с названием столбца, куда кликнем
        //getSelection() -> anchorNode -> parentElement.cellIndex
        let click_cell = document.getSelection();//получим весь Selection ячейки на которую кликнули
        let cell_index = click_cell.anchorNode;
        cell_index = cell_index.parentElement.cellIndex;//получили индекс ячейки!!!ура
        let all_rows = table.rows;
        let key_array = [];
        let table_object = {};
        let all_table_object = [];
        let save_key = all_rows[0].cells;
        for (let j = 0; j < save_key.length; j++){
            let save_key1 = save_key[j].textContent;
            key_array.push(save_key1);//заголовки столбцов
        }
        // for (let k = 0; k < key_array.length; k++){
        //     table_object[key_array[k]] = '';//подготовили объект с ключами
        // }
        for (let i = 1; i < all_rows.length; i++) {//перебор рядов начиная со 2 ряда
            let all_cells = all_rows[i].cells;
            let every_row_value = [];
            for (let j = 0; j < all_cells.length; j++) {//перебор ячеек в каждом ряду
                let save_cell = all_cells[j];
                let save_text = save_cell.textContent;
                every_row_value.push(save_text);
            }
            console.log(every_row_value);

            for (let k = 0; k < key_array.length; k++) {
                table_object[key_array[k]] = every_row_value[k];//объект
            }
            all_table_object.push(table_object);
            console.log(all_table_object);
    }
        //all_table_object.push(table_object);
        //console.log(every_row_value);
        //console.log(table_object);
        //console.log(all_table_object);
    }

}

sortTable('table_id');//передаем строкой

// function sortTable(table_id){
//     this.table = document.getElementById(table_id);
//     let keySort = document.getElementsByTagName('tr');//нам нужен индекс 0 (заголовки)
//     keySort[0].addEventListener('click', doSort);
//     function doSort(){
//         let click = event.target;//та ячейка с названием столбца, куда кликнем
//         //getSelection() -> anchorNode -> parentElement.cellIndex
//         let click_cell = document.getSelection();//получим весь Selection ячейки на которую кликнули
//         let cell_index = click_cell.anchorNode;
//         cell_index = cell_index.parentElement.cellIndex;//получили индекс ячейки!!!ура
//         let all_rows = table.rows;
//         let array_sort = [];
//         let key_object = [];
//         let row_value = [];
//         let every_object={};
//         for(let i = 1; i < all_rows.length; i++) {
//             let need_cell = all_rows[i].cells;
//             need_cell = need_cell[cell_index].textContent;//получим текст из тега <td>
//             array_sort.push(need_cell);
//             array_sort.sort();
//             let title_column = all_rows[0].cells;
//             title_column = title_column[i - 1].textContent;
//             key_object.push(title_column);
//             let every_row_value = all_rows[i];
//             every_row_value = document.getSelection();
//             //every_row_value = every_row_value.anchorNode;
//             //every_row_value = every_row_value.parentElement;
//             console.log(every_row_value);
//             for (let j = 0; j < key_object.length; j++) {
//                 every_object[key_object[j]] = 'hgjh';
//             }
//             console.log(every_object);
//
//         }
//         console.log(key_object);
//         // let object = {
//         //     key_object[0]:
//         // }
//
//     }
//
// }
//
// sortTable('table_id');//передаем строкой

