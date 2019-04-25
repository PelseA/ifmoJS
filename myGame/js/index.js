// let canvas = document.getElementsByTagName('canvas')[0];
// canvas.width = 1200;
// canvas.height = 600;
// let context = canvas.getContext('2d');
// context.fillStyle = 'lightgreen';
// context.fillRect(0, 0, 500, 500);//x y ширина высота
let canvas = new Canvas();
canvas.createCanvasAndRect();

let cat = new Cat('cat.png', 120, 120);
cat.context = canvas;
cat.x = 20;
cat.y = 30;
console.log(cat);
cat.showImg();


let mouse = new Mouse;
// function getMouse() {
//         let x = Math.floor(Math.random() * (420 - 2)) + 2;//max зависит от ширины канвы
//         let y = Math.floor(Math.random() * (420 - 2)) + 2;//min зависит от ширины канвы
//         mouse.showImg('mouse.png', x, y, 80, 80);
//         setTimeout(function(){
//             context.fillStyle = 'lightgreen';
//             context.fillRect(x, y, 80, 80);
//         }, 2000)
// }
// setInterval(getMouse, 2000);
//
// cat.moveCat('cat.png', cat, mouse);
