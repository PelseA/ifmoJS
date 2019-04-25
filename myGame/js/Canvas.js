class Canvas {
    constructor(width, height, canvas){
        this._width = 800;
        this._height = 600;
        this._canvas = document.getElementsByTagName('canvas')[0];
    }
        // get width(){ //а зачем get-теры НУЖНЫ если и без них работает???
        // return this._width;
        // }
        // get height(){
        // return this._height;
        // }
    createCanvasAndRect(){
        //let canvas = document.getElementsByTagName('canvas')[0];
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._context = this._canvas.getContext('2d');
        this._context.fillStyle = 'lightgreen';
        this._context.fillRect(0, 0, 700, 500);//x y ширина высота
        return this._context;
    }

}