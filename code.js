var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["602e7d9e-79ed-43ce-a711-09d24777b6ab","374999cf-ff4c-4e52-a133-a6e0fa0ace5f"],"propsByKey":{"602e7d9e-79ed-43ce-a711-09d24777b6ab":{"name":"puck_1","sourceUrl":null,"frameSize":{"x":32,"y":20},"frameCount":1,"looping":true,"frameDelay":12,"version":"0db2blC9jIWtrk7tFgXPFPskP7JhIu73","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":32,"y":20},"rootRelativePath":"assets/602e7d9e-79ed-43ce-a711-09d24777b6ab.png"},"374999cf-ff4c-4e52-a133-a6e0fa0ace5f":{"name":"sports_scoccer_1","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"azqqtUz0COhm.t4fZMRetE3LgwGMH1Uk","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/374999cf-ff4c-4e52-a133-a6e0fa0ace5f.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var bg=createSprite(200,200,400,400);
     bg.setAnimation("sports_scoccer_1");

var playerMallet;

var goal1=createSprite(200,12,110,27);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,388,110,27);
goal2.shapeColor=("yellow");

//making var score
var compScore=0;
var playerScore=0;

// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";
striker.setAnimation("puck_1");

var playerMallet = createSprite(200,350,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,50,50,10);
computerMallet.shapeColor = "black";

var gamestate='serve';

function draw() {
  //clear the screen
  background("limegreen");
  
  
  //reset striker and score
 resetstrikerandscore();
  
  //make the player paddle move with the Arrow keys
  paddleMovement();
  
  
  //AI for the computer paddle
  //make it move with the striker's y position
  computerMallet.x = striker.x;

  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
 
  
  
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  
  playerMallet.bounceOff(edges);
  playerMallet.bounceOff(goal2);
  computerMallet.bounceOff(edges);
  
if (keyDown("space")) {
    serve();
}
 
  
  //serve the striker when space is pressed
  
  drawSprites();
  
  if (gamestate=='serve'){
  textSize(30);
  fill("yellow");
  text('Click the spacebar to start',20,160);
  if (keyDown("space")) {
    serve();
    gamestate='play';
  }
  }
  
  textSize(18)
  fill("maroon")
  text("compScore"+compScore,25,185)
  text("playerScore"+playerScore,25,225)
  
   
  if(playerScore==5||compScore==5){
    fill("yellow")
    textSize(40)
    text("Game Over",100,200)
    resetstrikerandscore();
  }
}

function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>275)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<360)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}

function resetstrikerandscore(){
  if(striker.isTouching(goal1)){
    striker.x=200;
    striker.y=200;
    striker.velocityY=0;
    striker.velocityX=0 ;
    playerScore=playerScore+1;
  }
  if(striker.isTouching(goal2)){
    striker.x=200;
    striker.y=200;
    striker.velocityY=0;
    striker.velocityX=0;
    compScore=compScore+1;
  }
  if(compScore==6||playerScore==6){
    compScore=0
    playerScore=0
  }
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
