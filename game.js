// =========================================
// Flappy Bird - Part 1
// UI Game Studio
// =========================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highscore");
const startBtn = document.getElementById("startBtn");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Bird
const bird = {
    x: 90,
    y: 250,
    width: 38,
    height: 30,
    velocity: 0,
    gravity: 0.45,
    jump: -8,
    rotation: 0
};

// Game Variables
let pipes = [];
let particles = [];

let score = 0;
let highScore = Number(localStorage.getItem("flappyHigh")) || 0;

highScoreEl.innerText = highScore;

let running = false;
let gameOver = false;
let frame = 0;

const PIPE_WIDTH = 70;
const PIPE_GAP = 170;
const PIPE_SPEED = 2.8;

// Reset Game
function resetGame(){

    bird.y = 250;
    bird.velocity = 0;
    bird.rotation = 0;

    pipes = [];
    particles = [];

    frame = 0;
    score = 0;

    scoreEl.innerText = score;

    gameOver = false;

}

// Jump
function flap(){

    if(!running) return;

    bird.velocity = bird.jump;

}

// Controls
document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        flap();

    }

});

canvas.addEventListener("mousedown",flap);

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    flap();

});

// Start Button
startBtn.addEventListener("click",()=>{

    resetGame();

    running=true;

    startBtn.style.display="none";

});

// Draw Bird
function drawBird(){

    ctx.save();

    ctx.translate(
        bird.x + bird.width/2,
        bird.y + bird.height/2
    );

    ctx.rotate(bird.rotation);

    // Body
    ctx.fillStyle="#8A2BE2";

    ctx.beginPath();
    ctx.ellipse(0,0,18,14,0,0,Math.PI*2);
    ctx.fill();

    // Wing
    ctx.fillStyle="#B56CFF";

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
    ctx.arc(9,-4,1.3,0,Math.PI*2);
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
