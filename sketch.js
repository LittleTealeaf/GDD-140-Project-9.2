/// <reference path="./node_modules/@types/p5/global.d.ts" />

let player;

function setup() {
    createCanvas(windowWidth - 20,windowHeight - 20);

    player = createSprite(width / 2,height / 2, 30,30);
}

function draw() {
    background(220);
    drawSprites();

    if(frameCount % 10 == 0) {
        spawnEnemy();
    }
}

function spawnEnemy() {
    const enemy = createSprite(random(0,width),random(0,height),random(10,20),random(10,20))
    enemy.velocity.x = random(-4,4);
    enemy.velocity.y = random(-4,4);
}

//Key pressed
function keyPressed() {
    if(key == "a") {
        player.velocity.x = -4;
    } else if(key == "d") {
        player.velocity.x = 4;
    } else if(key == "w") {
        player.velocity.y = -4;
    } else if(key == "s") {
        player.velocity.y = 4;
    }
    return false;
}

//Reset only that axis if key is released
function keyReleased() {
    if(key == "a" || key == "d") {
        player.velocity.x = 0;
    } else if(key == "w" || key == "s") {
        player.velocity.y = 0;
    }
}
