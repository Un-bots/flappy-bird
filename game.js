const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const highText = document.getElementById("highscore");
const startBtn = document.getElementById("startBtn");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let bird = {
    x: 90,
    y: 250,
    width: 36,
    height: 28,
    velocity: 0,
    gravity: 0.45,
    jump: -8
};

let pipes = [];

let score = 0;

let highScore = localStorage.getItem("flappyHigh") || 0;

highText.innerText = highScore;

let running = false;

let frame = 0;

const PIPE_WIDTH = 70;

const GAP = 170;

const SPEED = 2.8;

function resetGame(){

    bird.y = 250;

    bird.velocity = 0;

    pipes = [];

    score = 0;

    frame = 0;

    scoreText.innerText = score;

}

function flap(){

    if(!running) return;

    bird.velocity = bird.jump;

}

document.addEventListener("keydown",e=>{

    if(e.code==="Space"){

        e.preventDefault();

        flap();

    }

});

canvas.addEventListener("touchstart",e=>{

    e.preventDefault();

    flap();

});

canvas.addEventListener("mousedown",flap);

startBtn.onclick=()=>{

    resetGame();

    running=true;

    startBtn.style.display="none";

};


function drawBird(){

    ctx.save();

    ctx.translate(bird.x + bird.width/2, bird.y + bird.height/2);

    ctx.rotate(bird.velocity * 0.05);

    // Body
    ctx.fillStyle = "#8A2BE2";

    ctx.beginPath();

    ctx.ellipse(0,0,18,14,0,0,Math.PI*2);

    ctx.fill();

    // Wing
    ctx.fillStyle = "#B56CFF";

    ctx.beginPath();

    ctx.ellipse(-3,2,8,6,-0.5,0,Math.PI*2);

    ctx.fill();

    // Eye
    ctx.fillStyle="white";

    ctx.beginPath();

    ctx.arc(8,-4,3,0,Math.PI*2);

    ctx.fill();

    ctx.fillStyle="black";

    ctx.beginPath();

    ctx.arc(9,-4,1.2,0,Math.PI*2);

    ctx.fill();

    // Beak
    ctx.fillStyle="#FFD54F";

    ctx.beginPath();

    ctx.moveTo(16,0);

    ctx.lineTo(24,-3);

    ctx.lineTo(24,3);

    ctx.closePath();

    ctx.fill();

    ctx.restore();

}

function update(){

    if(running){

        bird.velocity += bird.gravity;

        bird.y += bird.velocity;

        if(bird.y < 0){

            bird.y = 0;

            bird.velocity = 0;

        }

        if(bird.y + bird.height > HEIGHT){

            running = false;

            startBtn.innerText = "🔄 PLAY AGAIN";

            startBtn.style.display = "inline-block";

        }


function createPipe(){

    let topHeight = Math.random() * 220 + 60;

    pipes.push({

        x: WIDTH,

        top: topHeight,

        bottom: topHeight + GAP,

        passed: false

    });

}

function drawPipes(){

    ctx.fillStyle = "#8A2BE2";

    pipes.forEach(pipe=>{

        // Top Pipe
        ctx.fillRect(pipe.x,0,PIPE_WIDTH,pipe.top);

        // Bottom Pipe
        ctx.fillRect(
            pipe.x,
            pipe.bottom,
            PIPE_WIDTH,
            HEIGHT-pipe.bottom
        );

    });

}

    
