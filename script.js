let inputDir = {x:0, y:0};
let speed = 4.5;
let lastPainTime = 0;
let snakeArr = [
    {x:13, y:15},
];
let a = 2;
let b = 16;
let food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
check_hiscore(0);
let score = 0;
scoreBox.innerHTML = "Score: " + score;
// food != snake body, food should vanish when eaten

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPainTime)/1000 < 1/speed){
        return;
    }
    lastPainTime = ctime;
    gameEngine();
}

function gameEngine(){
    //Part 1: updating the snake array

    if(isCollide(snakeArr)){
        let tempscore = score;
        console.log(tempscore)
        inputDir = {x:0, y:0};
        score = 0;
        alert("Game Over! Press Enter to replay", check_hiscore(tempscore))
        snakeArr = [{x:13, y:15}];
    };

    function isCollide(snake){
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }

        for (let index = 1; index < snakeArr.length; index++){
            if(snake[index].x === snakeArr[0].x && snake[index].y === snakeArr[0].y){
                return true;
            }
        }
    };

    //if food is eaten, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score ++;
        speed += 0.005;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    };

    //moving the snake
    for(let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    };

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0 ){
            snakeElement.classList.add('head')
        }else{
        snakeElement.classList.add('snake')};
        board.appendChild(snakeElement);
    });
    //Part 3: display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}; //start the game
    switch(e.key){
        case "ArrowUp":
            // inputDir.x = 0;
            check("y",-1);
            break;
        case "ArrowDown": 
            // inputDir.x = 0; 
            check("y", 1);
            break;
        case "ArrowRight": 
            // inputDir.y = 0; 
            check("x",1);
            break;
        case "ArrowLeft":
            // inputDir.y = 0;  
            check("x",-1);
            break;
        
    }
})

function check(val,sign){
    let sign1 = 0;
    let sign2 = 0;
    if(val == 'y'){
        y1 = snakeArr[0].y;
        if(snakeArr[1] != undefined){ y2 = snakeArr[1].y} else{ y2 = -10000}
        sign1 = sign;
        sign2 = 0;
    }else if(val == "x"){
        y1 = snakeArr[0].x;
        if(snakeArr[1] != undefined){ y2 = snakeArr[1].x} else{ y2 = -10000}
        sign1 = 0;
        sign2 = sign;
    }

    if(snakeArr[1] != undefined && y1 + sign == y2){
        console.log("he", snakeArr[0], snakeArr[1]) 
        inputDir.y = -1*sign1;
        inputDir.x = -1*sign2;
    }
    else{
        inputDir.y = sign1;
        inputDir.x = sign2;`  `
    }
}

function check_hiscore(tempscore){
    let hiscore = localStorage.getItem('highscore');
    console.log(tempscore, hiscore)
    if(hiscore == null){
        localStorage.setItem("highscore", tempscore)
        hiscoreBox.innerHTML = "High Score: " + tempscore;
    }else{
        if(tempscore > hiscore){
            hiscore = tempscore
        }
        localStorage.setItem('highscore', hiscore)
        hiscoreBox.innerHTML = "High Score: " + hiscore;
    }
}