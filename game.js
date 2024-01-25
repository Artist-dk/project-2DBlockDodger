let cnv = document.getElementById("playground");
let ctx = cnv.getContext('2d');
let leftbtn = document.getElementById('leftbtn');
let rightbtn = document.getElementById('rightbtn');
let upbtn = document.getElementById('upbtn');
let downbtn = document.getElementById('downbtn');
let score=0;
let level=0;
let interval;
window.addEventListener('keydown', (event) => {
    var a = event.keyCode;
    a = a.toString();
    // console.log(a);
    switch(a) {
        case '37':
            shipOb.x -= shipOb.change;
            break;
        case '38':
            shipOb.y -= shipOb.change;
            break;
        case '39':
            shipOb.x += shipOb.change;
            break;
        case '40':
            shipOb.y += shipOb.change;
            break;
    }
});
leftbtn.addEventListener('click', () => {
    shipOb.x -= shipOb.change;
});
rightbtn.addEventListener('click', () => {
    shipOb.x += shipOb.change;
});
upbtn.addEventListener('click',() => {
    shipOb.y -= shipOb.change;
});
downbtn.addEventListener('click', () => {
    shipOb.y += shipOb.change;
});
document.getElementById('startbtn').addEventListener("click", (event)=>{
    var a = document.getElementById('startbtn');
    // console.log(a.textContent);
    switch(a.textContent) {
        case "stop":
            clearInterval(interval);
            event.value = 1;
            a.innerHTML = 'start';
            break;
        case "start":
            interval = setInterval(update,10);
            event.value = 0;
            a.innerHTML = 'stop';
            break;
        case "restart":
            window.location.reload();
            break;
    }
});
let shipOb = {
    x: 0,
    y: 0,
    h: 20,
    w: 20,
    change: 6
}
class obstacle {
    x1 = 0;
    y = 0;
    x2 = 0;
    gap = 0;
    h = 20;
    w1 = 0;
    w2 = 0;
    change = 0.5;
}
let playgroundOb = {
    height: 0,
    width: 0
}
let obst1 = new obstacle();
let obst2 = new obstacle();
window.onload = () => {
    // document.getElementById('container').style.height = window.innerHeight-20 + 'px';
    // document.getElementById('container').style.width = window.innerWidth -20 + 'px';
    clear(playgroundOb);
    drawPlayground(playgroundOb);
    drawGrid();
    updateObstacleDetails(obst1);
    updateObstacleDetails(obst2);
    drawObstacle(obst1);
    drawObstacle(obst2);
    drawShip(shipOb);
    updateEntries();
    decor();
    obst2.y -= playgroundOb.height/2;
    shipOb.x = 500/2-10;
    shipOb.y = 300-20;
}
function clear(o) {
    ctx.clearRect(0, 0, playgroundOb.width, playgroundOb.height);
}
function update(o) {
    clear(playgroundOb);
    drawPlayground(playgroundOb);
    drawGrid();
    updateObstacleDetails(obst1);
    updateObstacleDetails(obst2);
    drawObstacle(obst1);
    drawObstacle(obst2);
    drawShip(shipOb);
    collisionDetection(obst1);
    collisionDetection(obst2);
    updateEntries();
    decor();
    score += 1;
}
function updateEntries() {
    ctx.fillStyle = '#0080ff';
    ctx.font = "20px Arial";
    ctx.fillText('SCORE: '+score, 20,30);
    ctx.fillText('LEVEL: '+level, 20, 50);
}
function updateObstacleDetails(o) {
    if(o.y>playgroundOb.height) {
        o.y = 0;
        level += 1;
    }
    if(o.y == 0) {
        o.x1 = 0;
        o.gap = 100*Math.random();
        if(o.gap < 50) o.gap = 50;
        if(o.gap > 100) o.gap = 100;
        o.w1 = playgroundOb.width*Math.random();
        if(o.w1 > eval(playgroundOb.width-70)) {
            o.w1 = playgroundOb.width -70;
            o.gap = 50;
        }
        if(o.w1 < 20) {
            o.w1 = 20;
        }
        o.x2=o.w1+o.gap;
        o.w2 = playgroundOb.width - o.x2;          
    }
    o.y += o.change;
}
function drawPlayground(o) {
    // console.log("drawPlayground");
    var h = window.innerHeight;
    var w = window.innerWidth;
    if(h < w) {
        o.height = 300;
        o.width = 500;
        cnv.width = o.width;// eval(w-24);
        cnv.style.width = o.width + 'px'; //eval(w-24) + 'px';
        cnv.height = o.height; //eval(h/2-24);
        cnv.style.height = o.height + 'px';// eval(h/2-24) + 'px';
    } else {
        cnv.width = 500;// eval(w-24);
        cnv.style.width = '500px'; //eval(w-24) + 'px';
        cnv.height = 300; //eval(h/2-24);
        cnv.style.height = '300px';// eval(h/2-24) + 'px';
    }
}
function drawShip(o) {
	// global.ctx.save();
	// global.ctx.translate(o.x,o.y);
	// global.ctx.rotate(o.angle);
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.fillRect(o.x,o.y,20,20);
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.fill();
	// global.ctx.restore();
}
function drawObstacle(o) {
    ctx.beginPath();
    ctx.fillStyle = "lime";
    ctx.fillRect(o.x1,o.y,o.w1,o.h);
    ctx.fillRect(o.x2,o.y,o.w2,o.h);
    ctx.fill();
}
function decor() {
    ctx.fillStyle = "#0080ff";
    ctx.font = "10px arial";
    ctx.fillText("My First Game", 10, 290);
    ctx.font = "10px Magneto bold";
    ctx.fillText("@sketcher_dk", 430, 290);
}
function drawGrid() {
    ctx.strokeStyle = "rgb(0, 255, 0)";
    ctx.fillStyle = "rgb(0, 255, 0)";
    for(var x = 0; x < cnv.width; x += 5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x,cnv.height);
        if(x % 50 == 0){
            ctx.lineWidth =  0.3;
            ctx.fillText(x, x, 10);
        } else if (x % 25 == 0){
            ctx.lineWidth =  0.2;
        } else {
            ctx.lineWidth = 0.1;
        }
            
        if(x % 50 == 0 ) {}
        ctx.stroke();
    }
    for(var y = 0; y < cnv.height; y += 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cnv.width, y);
        if(y % 50 == 0){
            ctx.lineWidth =  0.3;
            ctx.fillText(y, 0,y + 10);
        } else if (y % 25 == 0){
            ctx.lineWidth =  0.2;
        } else {
            ctx.lineWidth = 0.1;
        }
        ctx.stroke();
    }
    cnv.style.backgroundColor = 'black';
}
function collisionDetection(o) {
    if(
        o.y+o.h >= shipOb.y &&
        o.y <= shipOb.y + shipOb.h
    ) {
        if(o.w1 >= shipOb.x || o.x2 <= shipOb.x+shipOb.w) {
            document.getElementById('startbtn').innerHTML = 'restart';
            ctx.fillStyle = '#0080ff';
            ctx.font = "60px Arial";
            ctx.fillText("GAME OVER", 50, 250);
            clearInterval(interval);
        }
    }
}