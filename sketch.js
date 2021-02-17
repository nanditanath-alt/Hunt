//variables for images
var path, boy, cash, diamonds, jwellery, sword, restart, restartPressed;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, restartImg, restartPressedImg;

//variable for treasure collection/score
var treasureCollection = 0;
var score = 0;

//variables for groups
var cashG, diamondsG, jwelleryG, swordGroup;

//variables to add the sound
var checkPoint, dieSound

//variables for gameState
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//function preload
function preload() {

  //loading the images for the sprites
  pathImg = loadImage("Road.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");

  //loading the animations
  endImg = loadAnimation("gameOver.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  restartImg = loadAnimation("restart image.png");
  restartPressedImage = loadAnimation("restartPressed.png");
  
  //loading the sounds
  checkPoint = loadSound("checkPoint[1].mp3");
  die = loadSound("die[1].mp3");
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  
  // Moving background
  path = createSprite(width/2, 200);
  path.addImage(pathImg);
  path.y = path.height/2;

  //creating boy running
  boy = createSprite(width/2, height-100, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
  
 
  
   end = createSprite(width/2,height-200,0,0);
  end.addAnimation("gameOver",endImg);
  end.scale = 0.9;
  
  restartPressed = createSprite(width/2,height/2,0,0);
  restartPressed.addAnimation("restartPress", restartPressedImg);
  restartPressed.scale = 0.5;
  
  restart = createSprite(width/2,height/2,0,0);
  restart.addAnimation("restartButton", restartImg);
  restart.scale = 0.5;

}

function draw() {

  background(0);

  edges = createEdgeSprites();
  boy.collide(edges);
  
if(gameState === 1){
     
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
   boy.setCollider("circle",0,0,500);
  boy.debug = false;
  
  if(score>0 && score%300 === 0){
       checkPoint.play(); 
    }
  
  //code to reset the background
  if (path.y > height) {
    path.y = height / 2;
  }
  path.velocityY = (8 + 3* score/300);
  
   end.visible = false;
  restart.visible = false;
  restartPressed.visible = false;
    
    //moving Sahil along with the mouse
    boy.x = World.mouseX;
   
    score = score + Math.round(getFrameRate()/60);
      
    //destroy for scores
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 500;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 5000;
    } else 
      if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 1000;
    }   
}
  
  if(gameState === 1 && swordGroup.isTouching(boy)) {
    die.play();
    gameState = 0;
        
  }

if(gameState === 0){ 
  
  cashG.destroyEach();
  swordGroup.destroyEach();
  diamondsG.destroyEach();
  boy.destroy();
  jwelleryG.destroyEach();
  
  end.visible = true;
  restart.visible = true;
  path.velocityY = 0;
  
  if( mousePressedOver(restart)){
    restartPressed.visible = true;
    reset();
  }
}
  
  drawSprites();
  fill("cyan");
  stroke("black");
  strokeWeight(4);
  textSize(20);  
  text("Treasure: Rs." + treasureCollection, windowWidth/2.5, windowHeight/8);
  
  fill("yellow");
  stroke("black");
  strokeWeight(2);
  textSize(15);
  text("SCORE: "+ score, windowWidth/8, windowHeight/10);

}

function reset(){
   gameState = 1;
  end.visible = false;
  restart.visible = false;
  restartPressed.visible = false;
  treasureCollection = 0;
  score = 0;
  
  boy.setCollider("circle",0,0,500);
  boy.debug = false;
  
  boy = createSprite(width-330, height-70, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
}


function createCash() {
  if (World.frameCount % 180 == 0) {
    var cash = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = (2.5 + 2* score/300);
    cash.lifetime = 250;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 250 == 0) {
    var diamonds = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = (5 + 2* score/300);
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
} 


function createJwellery() {
  if (World.frameCount % 200 == 0) {
    var jwellery = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = (3.5 + 2* score/300);
    jwellery.lifetime = 180;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 90 == 0) {
    var sword = createSprite(Math.round(random(40, width-50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = (7 + 2* score/300);
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}