var pacman,pacmanImg,obstacle,obstacleGroup,gameState,replayButton,replayButtonImg,pinkGhost,pinkGhostImg,pinkGhostGroup,pinkGhostSpawned,v
function preload(){
  pacmanImg = loadImage("images/Pacman1.png");
  pinkGhostImg = loadImage("images/PacmanGhostPink1.png");
  replayButtonImg = loadImage("images/restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  pacman = createSprite(windowWidth/2,windowHeight-25,100,100);
  pacman.addImage(pacmanImg);
  pacman.scale = 0.025;
  obstacleGroup = createGroup();
  pinkGhostGroup = createGroup();
  gameState = 0;
  pinkGhostGS = 0
  replayButton = createSprite(windowWidth/2,windowHeight/2,100,100);
  replayButton.visible = false;
  replayButton.addImage(replayButtonImg);
  replayButton.scale = 0.25;
  v=0
}

function draw() {
  background(0);
  replay();
  replayButton.depth = v + 10;
  if(gameState == 0){
    
    if(frameCount%120 == 0){
      spawnVerticalObstacles();
      spawnVerticalObstacles();
      spawnHorizontalObstacles();
    }
    if(frameCount%120 == 60){
      spawnHorizontalObstacles();
      spawnHorizontalObstacles();
      spawnVerticalObstacles();
    }
    replayButton.x = -100
    replayButton.visible = false;
    spawnPinkGhost();
    if(pinkGhostSpawned == true){
      if(pinkGhost.x >= pacman.x-10 || pinkGhost.x <= pacman.x+10){
        if(pinkGhost.y <= pacman.y){
          pinkGhost.velocityY = 5;
          pinkGhost.velocityX = 0;
        }
        if(pinkGhost.y >= pacman.y){
          pinkGhost.velocityY = -5;
          pinkGhost.velocityX = 0;
        }
      }
      if(pinkGhost.y >= pacman.y-10 || pinkGhost.y <= pacman.y+10){
        if(pinkGhost.x <= pacman.x){
          pinkGhost.velocityX = 5;
          pinkGhost.velocityY = 0;
        }
        if(pinkGhost.y >= pacman.y){
          pinkGhost.velocityX = -5;
          pinkGhost.velocityY = 0;
        }
      }
      if(pinkGhost.x <= 0){
        pinkGhost.x = windowWidth-10;
      }
      if(pinkGhost.x >= windowWidth){
        pinkGhost.x = 10;
      }
    }
    
    //pinkGhostGroup.pointToEach(pacman.x,pacman.y);
    
  }
  stopGame();
  teleport();
  drawSprites();
  text("x: " + mouseX + ",y: " + mouseY, mouseX, mouseY)
}

function keyPressed(){
  if(gameState == 0){
    if(keyCode == UP_ARROW){
      pacman.velocityY = -5;
      pacman.velocityX = 0;
      pacman.rotation = -90;
    }
    if(keyCode == DOWN_ARROW){
      pacman.velocityY = 5;
      pacman.velocityX = 0;
      pacman.rotation = 90;
    }
    if(keyCode == LEFT_ARROW){
      pacman.velocityY = 0;
      pacman.velocityX = -5;
      pacman.rotation = 180;
    }
    if(keyCode == RIGHT_ARROW){
      pacman.velocityY = 0;
      pacman.velocityX = 5;
      pacman.rotation = 0;
    }
  }
}

function spawnVerticalObstacles(){
  obstacle = createSprite(random(0,windowWidth),0,random(windowWidth/10,windowWidth/8),random(windowHeight/4,windowHeight/2));
  obstacle.velocityY = 2.5;  
  obstacle.shapeColor = color(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)))
  obstacleGroup.add(obstacle);
  v = obstacle.depth;
}
function spawnHorizontalObstacles(){
  obstacle = createSprite(random(0,windowWidth),0,random(150,250),random(50,100));
  obstacle.velocityY = 2.5;
  obstacle.shapeColor = color(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)))
  obstacleGroup.add(obstacle);
}
function spawnPinkGhost(){
  if(frameCount%200 == 0){
    pinkGhostSpawned = true;
    pinkGhost = createSprite(random(0,windowWidth),0);
    pinkGhost.velocityY = 2.5;
    pinkGhost.addImage(pinkGhostImg);
    pinkGhost.scale = 0.1;
    pinkGhost.lifetime = 400;
    pinkGhostGroup.add(pinkGhost);
  }
}
function teleport(){
  if(pacman.x <= 0){
    pacman.x = windowWidth-10;
  }
  if(pacman.x >= windowWidth){
    pacman.x = 10;
  }
}
function stopGame(){
  if(gameState == 1){
    pacman.velocityX = 0;
    pacman.velocityY = 0;
    obstacleGroup.setVelocityEach(0, 0);
    pinkGhostGroup.setVelocityEach(0, 0);
    replayButton.visible = true;
  }
  if(pacman.isTouching(obstacleGroup)){
    gameState = 1;
  }
  if(pacman.y < 0){
    gameState = 1;
  }
}
function replay (){
  if(gameState == 1){
    replayButton.x = windowWidth/2
    if(mousePressedOver(replayButton)){
      pacman.x = windowWidth/2;
      pacman.y = windowHeight-25;
      gameState = 0;
      obstacleGroup.destroyEach();
      pinkGhostGroup.destroyEach();
    }
  }
}