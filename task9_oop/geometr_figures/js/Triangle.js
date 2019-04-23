class Triangle{
    constructor(title = 'triangle', /*side_array*/) {
        this._title = title;
        //this._sides = side_array;
    }
    set sides(side_array){
        if(!side_array){
            console.log('введите координаты');
            return;
        }
        if(typeof(side_array) !== 'object'){
            console.log('Пример ввода длин сторон для треугольника [6, 12, 8]');
            return;
        }
        if((side_array[0]+side_array[1])>side_array[2] || (side_array[0]+side_array[2])>side_array[1]
            || (side_array[2]+side_array[1])>side_array[0]){
            this._sides = side_array;
        }
    }

    get sides(){
        return this._sides;
    }
    //методы для треугольника
    areaOfTriangle(){
        let S = 'формула';
        console.log('Вычисляем площадь теругольника');
        return S;
    }
    perimeterOfTriangle(){
        let a = this._sides[0];
        let b =  this._sides[1];
        let c = this._sides[2];
        let P = a +b +c;
        return P;
    }
}