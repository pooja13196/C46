var PLAY=1;
var END=0;
var gameState=PLAY
var ship, ship_sailing;
var bg, bgImg;
var ammo, ammoImg,ammoGroup;
var gameover,gameoverImg;
var edges;
var score=0
var attempts = 0;



function preload(){
  ship_sailing = loadImage("Navy.ship.png");
  ammoImg = loadImage("ammo.png");
  bgImg = loadImage("ocean.png");
  gameoverImg=loadImage("gameOver.png");
}



function setup() {
  createCanvas(1200,400);

  bg = createSprite(0,0,1200,400);
  bg.addImage(bgImg);
  bg.scale = 6

  ship = createSprite(100, 200, 50, 50);
  ship.addImage("ship",ship_sailing);
  ship.scale = 0.2;

  ship.visible=false;

gameover=createSprite(600,200);
gameover.addImage(gameoverImg);
gameoverImg.visible=false;


ammoGroup=new Group();

edges= createEdgeSprites();
}

function draw() {
//bg("white")


  if(gameState === PLAY){
    // moving ground
    bg.velocityX = -3 
ship.visible=true;
gameover.visible=false
    
    if (bg.x < 0){
      bg.x = bg.width/2;
    }

if(keyDown("space") ) {
  ship.velocityY = -8;
}
ship.velocityY = ship.velocityY + 0.5;

  
  spawnammo();

//if (ammoGroup.isTouching(ship)) {
  //mmoGroup.destroyEach();
 // score=score+100;
//}
if(ammoGroup.isTouching(ship)|| ship.y>1000 ){
  gameState= END;
}
}
   else if(gameState=== END){
bg.velocityX=0;
gameover.visible=true;
ship.visible=false
ammoGroup.destroyEach();
ammoGroup.setLifetimeEach(0);

if(keyDown("enter")){
  reset();
  ship.visible=true

}
   }

   //ship.collide(Topedge);
  drawSprites();
  stroke("orange");
  fill("white");
  textSize(10);
  text("YOU DIED:" + attempts,1000,50);
  

}

function reset(){
gameState=PLAY;
ship.visible=true
gameover.visible=false;
  ammoGroup.destroyEach();

  attempts=0

}
function spawnammo() {
  //write code here to spawn the ammo
  if (frameCount % 80 === 0) {
    var ammo = createSprite(600,250,40,10);
    ammo.y = Math.round(random(120,200));    
    ammo.addImage(ammoImg);
    ammo.scale = 0.15;
    ammo.velocityX= -4; 
    
    ammo.lifetime = 300;
    //ship.depth = ammo.depth + 1;
    ammoGroup.add(ammo);
  }
}

