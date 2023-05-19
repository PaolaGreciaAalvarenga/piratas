const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boat;
var boats = [];
var boatAnimation = [];
var boatSpritedata;
var boatSpritesheet;
var broakeboatAnimation = [];
var broakeboatSpritedata;
var broakeboatSpritesheet;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");
  broakeboatSpritedata = loadJSON("assets/boat/broken_boat.json");
  broakeboatSpritesheet = loadImage("assets/boat/broken_boat.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  var boatFrames = boatSpritedata.frames;
  for(var i = 0; i < boatFrames.length; i++) {
  var pos = boatFrames[i].position; 
  var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  boatAnimation.push(img);
  }

  var broakeboatFrames = broakeboatSpritedata.frames;
  for(var i = 0; i < broakeboatFrames.length; i++) {
  var pos = broakeboatFrames[i].position;
  var img = broakeboatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  broakeboatAnimation.push(img);
  }

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    colisao(i);
  }

  cannon.display();

  showBoats()

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, i) {
  if (ball) {
    ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height -50) {
    ball.remove(i);
  }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function showBoats(){
if (boats.length>0){
 if (boats[boats.length-1] === undefined || boats[boats.length-1].body.position.x<width-300) {
var positions = [-40, -60, -70, -20];
var position = random(position);
var boat = new Boat(width-79, height-60, 170, 170, position, boatAnimation);
boats.push(boat);

 }

for(var i = 0; i<boats.length; i++) {
  if (boats[i]) {
  boats[i].display();
  boats[i].animate();
  Matter.Body.setVelocity(boats[i].body, {x:-0.9, y:0});
  }

}

} else {
 var boat = new Boat(width-79, height-60, 170, 170, -80, boatAnimation);
 boats.push(boat);
}
}

function colisao (index) {
 
for(var i = 0; i<boats.length; i++) {

if(balls[index] !== undefined && boats[i] !== undefined) {
var colision = Matter.SAT.collides(balls[index].body, boats[i].body);
if(colision.collided) {
boats[i].remove(i);
World.remove(world, balls[index].body);
delete balls[index];
}
}
}
}


