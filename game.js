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
