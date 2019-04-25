class Unit{
    constructor(titleImg, width, height){
        this._titleImg = titleImg;
        this._width = width;
        this._height = height;
    }
    set context(newCanvas){//canvas созданный new Canvas в файле index.js
        this._context = newCanvas.createCanvasAndRect();
    }
    get context(){
        return this._context;
    }
    set x(x){
        if(x > 420){
            console.log('x не больше 420');
            return;
        }
        this._x = x;
    }
    set y(y){
        if(y > 420){
            console.log('y не больше 420');
            return;
        }
        this._y = y;
    }
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    get width(){
        return this._width;
    }
    get height(){
        return this._height;
    }
    get titleImg(){
        return this._titleImg;
    }
    showImg(){
        console.log('рисуем кого-то');
        let context = this._context;
        console.log('Полученный context: ', context);
        let img = new Image();
        console.log('изображение созданное new Image(): ', img);
        img.src = 'img/' + this._titleImg;
        console.log('Путь до изображения: ', img);
        img.onload = //function(){
            context.drawImage(img, this._x, this._y, this._width, this._height);
        //}
        console.log('Уже должно было отрисоваться');
    }
}

class Cat extends Unit{
    moveCat(titleImg, cat, enemy){
        let x = 20;
        let y = 30;
        let img = new Image();
        img.src = 'img/' + titleImg;
        document.addEventListener('keypress', movePic);

        function movePic(event){
            context.fillStyle = 'lightgreen';
            context.fillRect(x, y, 120, 120);
            if(event.code === 'KeyD'){//если эта кнопка
                x+=6;//идем вперед
            }
            if(event.code === 'KeyA'){//если эта кнопка
                x-=6;//идем вперед
            }
            if(event.code === 'KeyW'){//если эта кнопка
                y-=6;//идем вперед
            }
            if(event.code === 'KeyS'){//если эта кнопка
                y+=6;//идем вперед
            }
            context.drawImage(img, x, y, 120, 120);
        }
        document.addEventListener('keypress', collision);

        function collision(cat, enemy){
            let XColl=false;
            let YColl=false;
            if ((cat.x + cat.width >= enemy.x) && (cat.x <= enemy.x + enemy.width)) {
                XColl = true;
            }
            if ((cat.y + cat.height >= enemy.y) && (cat.y <= enemy.y + enemy.height)) {
                YColl = true;
            }
            if (XColl&&YColl) {
                console.log('столкнулись');
                return true;
            }
            console.log('НЕстолкнулись');
            return false;
        }
    }

}

class Mouse extends Unit{
   set
}


