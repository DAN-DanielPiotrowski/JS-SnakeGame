class snakeGame{
    constructor(speed, score){
        this.snake = {
            position: {
                headx: 10,
                heady: 10,
            },
            xvelocity: 0,
            yvelocity: 0,
            tailLength: 0,
        };

        this.tileCount = 25;
        this.tileSize = 18;
        this.speed = speed;
        this.score = score;

        this.food = {
            position: {
                x: 5,
                y: 5,
            }
        }
    }
}

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const canvas = document.getElementById('snakegame');
const recordwall = document.getElementById('recordwall');
let context = canvas.getContext('2d');
const snakeParts=[];
const player = new snakeGame(5,0);
let LastScore=0;

