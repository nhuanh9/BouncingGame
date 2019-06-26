const BALL_DEFAULT_POSITION_X = 300;
const BALL_DEFAULT_POSITION_Y = 50;
const RADIUS = 15;
const SPEED = 3;
const MAPWIDTH = document.getElementById("canvas").offsetWidth;
const MAPHEIGHT = document.getElementById("canvas").offsetHeight;
const CTX = document.getElementById("canvas").getContext("2d");

const BAR_DEFAULT_WIDTH = 100;
const BAR_DEFAULT_HEIGHT = 15;
const BAR_DEFAULT_SPEED = 25;

let Ball = function () {
    this.radius = RADIUS;
    this.speedX = SPEED;
    this.speedY = SPEED;
    this.cx = BALL_DEFAULT_POSITION_X;
    this.cy = BALL_DEFAULT_POSITION_Y;

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
        let isTouchBar =  ((this.bottom>=bar.getY() && this.top < bar.getY()+bar.height)&&(this.right>bar.getX()&&this.left<(bar.getX()+bar.width)));
        let isLeft = this.left <= 0;
        let isRight = this.right >= MAPWIDTH;
        let isTop = this.top <= 0;
        let isBot = this.bottom >= MAPHEIGHT;
        if (isLeft|| isRight) {
            this.speedX = -this.speedX;
        }
        if (isTop || isTouchBar ) {
            this.speedY = -this.speedY;
        }
        if (isBot){
            alert("You Lose");
            this.cx = BALL_DEFAULT_POSITION_X;
            this.cy = BALL_DEFAULT_POSITION_Y;
        }
    }
};
let Bar = function () {
    this.x = MAPWIDTH/2 + BAR_DEFAULT_WIDTH;
    this.y = MAPHEIGHT*0.85;
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
