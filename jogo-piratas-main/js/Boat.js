class Boat{
 constructor(x, y, w, h, boatPos, boatAnimation) {
this.animation = boatAnimation;
this.body = Bodies.rectangle(x, y, w, h);
World.add(world, this.body);
this.w = w;
this.h = h;
this.image = loadImage("assets/boat.png");
this.boatPosition = boatPos;
this.speed = 0.05;
this.isBroken = false;

 }

animate(){

this.speed += 0.05;
}

display(){

var angle = this.body.angle;
var pos = this.body.position;
var index = floor(this.speed%this.animation.length);

push()

translate(pos.x, pos.y);
rotate(angle);
imageMode(CENTER);
image(this.animation[index], 0, this.boatPosition, this.w, this.h);

pop()


}
remove(index) {
this.animation = broakeboatAnimation;
this.speed = 0.05;
this.width = 500;
this.height = 500;
this.isBroken = true;
setTimeout(() => {
World.remove(world, boats[index].body);
delete boats[index]
}, 2000) 

}
}





