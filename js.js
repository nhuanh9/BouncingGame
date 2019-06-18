const RADIUS = 15;
const SPEED = 3;
const MAPWIDTH = document.getElementById("canvas").offsetWidth;
const MAPHEIGHT = document.getElementById("canvas").offsetHeight;
const CTX = document.getElementById("canvas").getContext("2d");

const BAR_DEFAULT_POSITION_X = 300;
const BAR_DEFAULT_POSITION_Y = 510;
const BAR_DEFAULT_WIDTH = 100;
const BAR_DEFAULT_HEIGHT = 15;
const BAR_DEFAULT_SPEED = 20;

let Ball = function () {
    this.radius = RADIUS;
    this.speedX = SPEED;
    this.speedY = SPEED;
    this.cx = Math.floor(Math.random()*(MAPWIDTH - this.radius))+this.radius;
    this.cy = Math.floor(Math.random()*(MAPHEIGHT - this.radius))+this.radius;

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };
    this.moveBall = function () {
        this.cx += this.speedX;
        this.cy += this.speedY;
        this.left = this.cx - this.radius;
        this.top = this.cy - this.radius;
        this.right = this.cx + this.radius;
        this.bottom = this.cy + this.radius;
    };

    this.checkCollision = function (bar) {
        let isTouchBar =  ((this.bottom >= 510)&&(this.left>=bar.getX()&&this.left<=(bar.getX()+BAR_DEFAULT_WIDTH)));
        let isLeft = this.left <= 0;
        let isRight = this.right >= MAPWIDTH;
        let isTop = this.top <= 0;
        let isBot = this.bottom >= MAPHEIGHT;
        if (isLeft|| isRight) {
            this.speedX = -this.speedX;
        }
        if (isTop || isTouchBar) {
            this.speedY = -this.speedY;
        }
        if (isBot){
            alert("You Lose");
            this.cx = Math.floor(Math.random()*(MAPWIDTH - this.radius))+this.radius;
            this.cy = Math.floor(Math.random()*(MAPHEIGHT - this.radius))+this.radius;
        }
    }
};
let Bar = function () {
    this.x = BAR_DEFAULT_POSITION_X;
    this.y = BAR_DEFAULT_POSITION_Y;
    this.width = BAR_DEFAULT_WIDTH;
    this.height = BAR_DEFAULT_HEIGHT;
    this.drawBar = function (ctx) {
        ctx.fillStyle = "#2171f2";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.moveRight = function () {
        if (this.x < MAPWIDTH - this.width) {
            this.x += BAR_DEFAULT_SPEED;
        }
        this.drawBar(CTX);
    };
    this.moveLeft = function () {
        if (this.x >= 0) {
            this.x -= BAR_DEFAULT_SPEED;
        }
        console.log(this.y+","+this.x);
        this.drawBar(CTX);
    };
    this.getX = function () {
        return this.x;
    };
    this.getY= function () {
        return this.y;
    }
};
