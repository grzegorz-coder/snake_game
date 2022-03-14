const boardBorder = "black"
const boardBackground = "white"
const snake_col = "gold"
const snake_border = "black"

let snake = 
[
    {x: 200, y: 200}, 
];

let score =0;
let changing_direction = false;
let targetX;
let targetY;
let dx = 10;
let dy = 0;

const gameBoard = document.querySelector(".game-window");
const gameBoard_ctx = gameBoard.getContext("2d");

main(); 
genTarget();
document.addEventListener("keydown", change_direction)

function main(){ 
    if (end_game()) return alert("Game over");
    changing_direction=false;
    setTimeout(function onTick()
    {
        clearSnakeBoard();
        drawTarget();
        move_body();
        drawAllBody();
        main();
    }, 100)
    
}

function clearSnakeBoard() {
    gameBoard_ctx.fillStyle = boardBackground;
    gameBoard_ctx.strokeStyle = boardBorder;
    gameBoard_ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    gameBoard_ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);

}

function drawAllBody()
{
    snake.forEach(drawParts);
}

function drawTarget()
{
    gameBoard_ctx.fillStyle = "darkred";
    gameBoard_ctx.strokeStyle = "lightred";
    gameBoard_ctx.fillRect(targetX, targetY, 10, 10)
    gameBoard_ctx.strokeRect(targetX, targetY, 10, 10)
}

function drawParts(snakePart)
{
    gameBoard_ctx.fillStyle = snake_col;
    gameBoard_ctx.strokeStyle = snake_border;
    gameBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    gameBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function end_game() 
    {
        for (let i=4; i < snake.length; i++)
        {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
            return true
        }
        const hitleftwall = snake[0].x < 0;
        const hitrightwall = snake[0].x > gameBoard.width - 10;
        const hittopwall = snake[0].y < 0;
        const hitbottomwall = snake[0].y > gameBoard.height -10;

        return hitleftwall || hitrightwall || hittopwall || hitbottomwall
        
    }

function snakeTarget(min, max)
    {
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }
    
function genTarget()
    {
        targetX = snakeTarget(0, gameBoard.width - 10);
        targetY = snakeTarget(0, gameBoard.height - 10);
        snake.forEach(function has_snake_get_target(part) {
            const get_target = part.x === targetX && part.y === targetY;
            if(get_target) genTarget();
        });
    }
    

function change_direction(event) 
    {
        const LEFTKEY = 37;
        const RIGHTKEY = 39;
        const UPKEY = 38;
        const DOWNKEY = 40;
    
        if(changing_direction) return;
        changing_direction=true;
        const pressed = event.keyCode;
        const up = dy === -10;
        const down = dy === 10;
        const left = dx === -10;
        const right = dx === 10;
    
            if (pressed === LEFTKEY && !right)
            {
                dx = -10;
                dy = 0;
            }
            if (pressed === RIGHTKEY && !left)
            {
                dx = 10;
                dy = 0;
            }
            if (pressed === DOWNKEY && !up)
            {
                dx = 0;
                dy = 10;
            }
            if (pressed == UPKEY && !down)
            {
                dx = 0;
                dy = -10;
            }
    }

function move_body() {
    const head = { x:snake[0].x+dx, y:snake[0].y+dy};
    snake.unshift(head);
    const has_get_target = snake[0].x === targetX && snake[0].y === targetY;
    if(has_get_target){
        score += 10;
        document.getElementById('score').innerHTML = score;
        genTarget();
    } else {
        snake.pop();
    }
}

/*const startGameButton = document.querySelector(".game-start")
startGameButton.addEventListener('click', () => {
    document.getElementById('score').style.display = "inline";
    document.querySelector(".game-window").style.display = "grid";
})*/





// 4. Incorporating food and score