/// <reference path="./node_modules/@types/p5/global.d.ts" />

/*
This game has a title screen that contains the game instructions
*/

var player;
var health = 100;
var health_display = health;

var startFrame;

var framesSurvived;

var dashx = 0;
var dashy = 0;

var currentScreen = 0;

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);

    player = createSprite(width / 2, height / 2, 30, 30);
}

function draw() {
    switch (currentScreen) {
        case 0:
            drawInstructions();
            break;
        case 1:
            drawGame();
            break;
        case 2:
            drawGameOver();
            break;
    }
}

function drawInstructions() {
    background(200);
    fill('black');
    textSize(40);
    textAlign(CENTER);
    text("Avoid the Enemies!", width / 2, 100);
    textSize(15);
    text("Use the WASD movement keys to avoid enemies for as long as you can!", width / 2, 200);
    text("You can dash by hitting SPACE", width / 2, 220);
    text("Be careful, hitting an enemy will reduce your health total", width / 2, 250);
    text("When you are ready, hit SPACE to start!",width/2,300);

    text("Created by: Thomas Kwashnak",width/2,height-15);
}

function drawGame() {
    background(220);

    if (frameCount % 5 == 0) {
        spawnEnemy();
    }

    dashx *= 0.9;
    dashy *= 0.9;

    player.position.x += dashx;
    player.position.y += dashy;

    player.position.x = min(max(player.position.x,0),width);
    player.position.y = min(max(player.position.y,0),height);

    player.velocity.x = keyDown('a') ? -4 : keyDown('d') ? 4 : 0;
    player.velocity.y = keyDown('w') ? -4 : keyDown('s') ? 4 : 0;


    for (var i = 0; i < allSprites.length; i++) {
        const sprite = allSprites[i];
        if (player.overlap(sprite)) {
            health -= 10;
            sprite.remove();
        } else if (sprite.position.x < -50 || sprite.position.x > width + 50 || sprite.position.y < -50 || sprite.position.y > height + 50) {
            //Removes if no longer being rendered, keeps the total count of sprites down
            sprite.remove();
        }
    }

    drawSprites();
    showHealth();

    if(health <= 0) {
        gameOver();
    }
}

function drawGameOver() {
    background(100,100,100,10);

    textSize(40);
    textAlign(CENTER);
    fill('white');
    text("GAME OVER",width/2,height/2);
    textSize(20);
    text("You survived for " + int(framesSurvived / frameRate()) + " seconds",width/2,height*2/3);
    textSize(15);
    text("Press space to restart",width/2,height*3/4);
}

function startGame() {
    // Clean all entities
    while (allSprites.length > 0) {
        allSprites[0].remove();
    }
    player = createSprite(width / 2, height / 2, 30, 30);
    health = 100;
    health_display = health;
    currentScreen = 1;
    startFrame = frameCount;
}

function gameOver() {
    framesSurvived = frameCount - startFrame;
    currentScreen = 2;
}

function spawnEnemy() {
    const enemy = createSprite(random(0, width), random(0, height), random(10, 20), random(10, 20))
    enemy.velocity.x = random(-4, 4);
    enemy.velocity.y = random(-4, 4);
}

//Key pressed
function keyPressed() {
    if (key == " ") {
        if (currentScreen == 0) {
            startGame();
        } else if(currentScreen == 1) {
            dashx = player.velocity.x * 3;
            dashy = player.velocity.y * 3;
        } else if(currentScreen == 2) {
            currentScreen = 0;
        }
    }
    return false;
}

function showHealth() {
    health_display += (health - health_display) * 0.05;
    fill('red');
    noStroke();
    rect(0, 0, width * health_display / 100, 20);
}
