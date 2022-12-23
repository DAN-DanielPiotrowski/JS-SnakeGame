const drawGame = () => {
    clearScreen();
    drawSnake();
    changeSnakePosition();
    checkCollision();
    drawFood();
    drawScore();
    let result=isGameOver();
    if(result){
        return;
    }

    setTimeout(drawGame, 1000/player.speed);
}

const drawSnake = () => {
    context.fillStyle="green";
    console.log(snakeParts.length);
    for(let i=0; i<snakeParts.length; i++){
        let part=snakeParts[i];
        context.fillRect(part.x * player.tileCount, part.y * player.tileCount, player.tileSize, player.tileSize);
    }
    snakeParts.push(new snakePart(player.snake.position.headx, player.snake.position.heady));
    if(snakeParts.length>player.snake.tailLength){
        snakeParts.shift();
    }

    context.fillStyle = "orange";
    context.fillRect(player.snake.position.headx * player.tileCount, player.snake.position.heady * player.tileCount, player.tileSize, player.tileSize);

}

const drawFood = () => {
    context.fillStyle="red";
    context.fillRect(player.food.position.x * player.tileCount, player.food.position.y * player.tileCount, player.tileSize, player.tileSize);
}

const drawScore = () => {
    context.fillStyle = "white";
    context.font="20px verdena";
    context.fillText(`Score: ${player.score}`, canvas.clientWidth-100, 20);
}

const changeSnakePosition = () => {
    player.snake.position.headx = player.snake.position.headx + player.snake.xvelocity;
    player.snake.position.heady = player.snake.position.heady + player.snake.yvelocity;
}

const clearScreen = () => {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

const checkCollision = () => {
    if(player.food.position.x===player.snake.position.headx && player.food.position.y===player.snake.position.heady){
        player.food.position.x = -100;
        player.food.position.y = -100;
        player.snake.tailLength++;
        player.score++;
        if(player.speed%5===0) player.speed++;
        setTimeout(()=>{
            player.food.position.x=Math.floor(Math.random()*player.tileCount);
            player.food.position.y=Math.floor(Math.random()*player.tileCount);
        }, 1000);
    }
}

const isGameOver = () =>{
    let gameOver = false;

    if(player.snake.xvelocity === 0 && player.snake.yvelocity === 0){
        return false;
    }

    if(player.snake.position.headx < 0 || player.snake.position.heady < 0 || player.snake.position.headx === player.tileCount || player.snake.position.heady === player.tileCount){
        gameOver = true
    }

    for(let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x===player.snake.position.headx && part.y === player.snake.position.heady){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        context.fillStyle = "white";
        context.font = "50px verdana";
        context.fillText("Game Over!", canvas.clientWidth/4, canvas.clientHeight/2)
    }

    return gameOver;
}

drawGame();

const keyDown = (e) => {
    switch(e.keyCode){
        case 37:
            if(player.snake.xvelocity===1) break;
            player.snake.xvelocity=-1;
            player.snake.yvelocity=0;
            break;
        case 38:
            if(player.snake.yvelocity===1) break;
            player.snake.xvelocity=0;
            player.snake.yvelocity=-1;
            break;
        case 39:
            if(player.snake.xvelocity===-1) break;
            player.snake.xvelocity=1;
            player.snake.yvelocity=0;
            break;
        case 40:
            if(player.snake.yvelocity===-1) break;
            player.snake.xvelocity=0;
            player.snake.yvelocity=1;
            break; 
    }
}

document.body.addEventListener('keydown', keyDown);

