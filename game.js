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

// =========================================
// Part 2 - Physics + Background + Game Loop
// =========================================

// Sky Background
function drawBackground(){

    let sky = ctx.createLinearGradient(0,0,0,HEIGHT);

    sky.addColorStop(0,"#1a0033");
    sky.addColorStop(.5,"#32005e");
    sky.addColorStop(1,"#0b0018");

    ctx.fillStyle=sky;
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Stars
    ctx.fillStyle="white";

    for(let i=0;i<40;i++){

        ctx.globalAlpha=.7;

        ctx.beginPath();

        ctx.arc(
            (i*37)%WIDTH,
            (i*83+frame*.2)%HEIGHT,
            1.5,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

    ctx.globalAlpha=1;

}

// Ground
function drawGround(){

    ctx.fillStyle="#3d1b5f";

    ctx.fillRect(0,HEIGHT-40,WIDTH,40);

    ctx.fillStyle="#00ff99";

    ctx.fillRect(0,HEIGHT-40,WIDTH,5);

}

// Bird Physics
function updateBird(){

    if(!running) return;

    bird.velocity+=bird.gravity;

    bird.y+=bird.velocity;

    bird.rotation=Math.min(bird.velocity*.08,.7);

    // Ceiling

    if(bird.y<0){

        bird.y=0;

        bird.velocity=0;

    }

    // Ground

    if(bird.y+bird.height>=HEIGHT-40){

        gameOver=true;

        running=false;

        startBtn.innerText="🔄 PLAY AGAIN";

        startBtn.style.display="inline-block";

    }

}

// Render
function render(){

    drawBackground();

    drawPipes();

    drawGround();

    drawBird();

}

// Update
function update(){

    frame++;

    updateBird();
    updatePipes();

}

// Main Loop
function animate(){

    update();

    render();

    requestAnimationFrame(animate);

}

animate();

// =========================================
// Part 3 - Pipes + Score + Collision
// =========================================

function createPipe(){

    let topHeight=Math.random()*220+60;

    pipes.push({

        x:WIDTH,

        top:topHeight,

        bottom:topHeight+PIPE_GAP,

        passed:false

    });

}

function updatePipes(){

    if(!running) return;

    if(frame%120===0){

        createPipe();

    }

    for(let i=pipes.length-1;i>=0;i--){

        let p=pipes[i];

        p.x-=PIPE_SPEED;

        // Score
        if(!p.passed && p.x+PIPE_WIDTH<bird.x){

            p.passed=true;

            score++;

            scoreEl.innerText=score;

            if(score>highScore){

                highScore=score;

                localStorage.setItem("flappyHigh",highScore);

                highScoreEl.innerText=highScore;

            }

        }

        // Collision
        if(

            bird.x+bird.width>p.x &&
            bird.x<p.x+PIPE_WIDTH &&
            (bird.y<p.top ||
             bird.y+bird.height>p.bottom)

        ){

            running=false;

            gameOver=true;

            startBtn.innerText="🔄 PLAY AGAIN";

            startBtn.style.display="inline-block";

        }

        // Remove old pipe
        if(p.x<-PIPE_WIDTH){

            pipes.splice(i,1);

        }

    }

}

function drawPipes(){

    pipes.forEach(p=>{

        ctx.fillStyle="#8A2BE2";

        // Top
        ctx.fillRect(
            p.x,
            0,
            PIPE_WIDTH,
            p.top
        );

        // Bottom
        ctx.fillRect(
            p.x,
            p.bottom,
            PIPE_WIDTH,
            HEIGHT-p.bottom-40
        );

        // Pipe caps
        ctx.fillStyle="#B56CFF";

        ctx.fillRect(
            p.x-5,
            p.top-18,
            PIPE_WIDTH+10,
            18
        );

        ctx.fillRect(
            p.x-5,
            p.bottom,
            PIPE_WIDTH+10,
            18
        );

    });

}

