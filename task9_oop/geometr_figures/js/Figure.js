class Figure {
    constructor(title_figure) {//название фигуры латиницей
        this._title_figure = title_figure;
    }
    set coord(coord_array){
        if(!coord_array){
            console.log('введите координаты');
            return;
        }
        if(typeof(coord_array) !== 'object'){
            console.log('Пример ввода координат для треугольника [[5, 4], [9,2], [12, 8]]');
            return;
        }
        if(coord_array.length == 4){
            console.log('Координаты для четырехугольника');
            this._coord_array = coord_array;
        }
        if(coord_array.length == 3){
            console.log('Координаты для треугольника');
            this._coord_array = coord_array;
        }
        if(coord_array.length == 2){ // [4, 7] - центр и [8, 12] точка на окружности
            console.log('Координаты для окружности');
            this._coord_array = coord;
        }

    }
    get coord(){
        return this._coord;
    }
    countArea(){
        if(this._title_figure == 'triangle'){
            console.log('считаем площадь треугольника');
        }
        if(this._title_figure == 'rectangle'){
            console.log('считаем площадь прямоугольника');
        }
        if(this._title_figure == 'circle'){
            console.log('считаем площадь круга');
        }
    }
    countPerimeter(){
        if(this._title_figure == 'triangle'){
            console.log('считаем периметр треугольника');
        }
        if(this._title_figure == 'rectangle'){
            console.log('считаем периметр прямоугольника');
        }
        if(this._title_figure == 'circle'){
            console.log('считаем длину окружности');
        }
    }

}
