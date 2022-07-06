//matterJS setup
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

//variables
var engine, world, body;

var backdrop;
var striker, aim, showAim, aimAngle, aimPower;
var ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10;

var wall1, wall2, wall3, wall4;
var charge;
window.score;
var defenderOrbit;
function preload(){
  //load in images
  backdrop = loadImage("sprites/back.jpeg");
  aim = loadImage("sprites/arrow.png")
}

function setup() {
  //create the canvas
  createCanvas(1000,700);

  //more matterJS setup
  engine = Engine.create();
  world = engine.world;

  //deny gravity
  engine.world.gravity.y = 0;

  //create objects
  striker = new Striker(200, 350);

  ball1 = new Ball(800, 350, 255, 60, 60);
  

  wall1 = new Wall(1500, 100, 700, 10);
  wall2 = new Wall(1500, 575, 700, 10);
  wall3 = new Wall(25, 350, 10, 100);
  wall4 = new Wall(975, 350, 10, 300);

  aimAngle = 0;
  aimPower = 10;
  window.score = 0;
  defenderOrbit=0;
}

function draw() {
  //draw the background
  background(backdrop);  
  // text(mouseX + "," + mouseY, 150, 150);
  //update the engine
  Engine.update(engine);

  //show the aiming
  if(keyIsDown(UP_ARROW) && aimPower < 70){
    showAim = true;
    aimPower++;
  }

  if(keyIsDown(DOWN_ARROW) && aimPower > 10){
    aimPower--;
  }

  //create the aiming
  if(showAim === true){
    imageMode(CENTER);
    tint(255 - aimPower * 3, aimPower * 3, 0);

    push();
    translate(striker.body.position.x + (-5 + ((aimPower-10)*-0.4)) + aimPower/2.5, striker.body.position.y);
    rotate(aimAngle/200);
    image(aim, 0, 0, 100 + aimPower / 1.2, 50);
    pop();

    noTint();
    imageMode(CORNER);
  }

  //reset aim angle
  if(aimAngle > 1260){
    aimAngle = 0
  }

  if(aimAngle < 0){
    aimAngle = 1250;
  }


  //angle the aiming
  if(keyIsDown(LEFT_ARROW) && showAim === true){
    aimAngle-=7.5;
  }

  if(keyIsDown(RIGHT_ARROW) && showAim === true){
    aimAngle+=7.5;
  }

  //fire the striker
  if(keyIsDown(32) && showAim === true){
    //157.5 per rotation
    if(aimAngle < 157.5){
      Matter.Body.setVelocity(striker.body, {x: aimPower/2.5, y: aimAngle/3});
    }else if(aimAngle < 315){
      Matter.Body.setVelocity(striker.body, {x: aimPower/2.5, y: aimAngle/5});
    }else if(aimAngle < 472.5){
      Matter.Body.setVelocity(striker.body, {x: aimPower/-8, y: aimAngle/8});
    }else if(aimAngle < 630){
      Matter.Body.setVelocity(striker.body, {x: aimPower/-2.5, y: aimAngle/16});
    }else if(aimAngle < 787.5){
      Matter.Body.setVelocity(striker.body, {x: aimPower/-4, y: aimAngle/-32});
    }else if(aimAngle < 945){
      Matter.Body.setVelocity(striker.body, {x: aimPower/-4, y: aimAngle/-32});
    }else if(aimAngle < 1102.5){
      Matter.Body.setVelocity(striker.body, {x: aimPower/2.5, y: aimAngle/-50});
    }else{
      Matter.Body.setVelocity(striker.body, {x: aimPower, y: aimAngle/-64});
    }
    aimPower = 0;
    showAim = false;
  }

  //display objects
  striker.display();

  ball1.display();

  // wall1.display();
  // wall2.display();
  // wall3.display();
  // wall4.display();


  //drag mouse
  textAlign(CENTER);
  textSize(30);
  text("Score: " + window.score, 500, 30);
  if(defenderOrbit === 0){
    Matter.Body.setVelocity(ball1.body, {x: -2.5, y: 0})
  }
  if(defenderOrbit === 70){
    Matter.Body.setVelocity(ball1.body, {x: 0, y: -2.5})
  }
  if(defenderOrbit === 140){
    Matter.Body.setVelocity(ball1.body, {x: 2.5, y: 0})
  }
  if(defenderOrbit === 210){
    Matter.Body.setVelocity(ball1.body, {x: 0, y: 2.5})
  }
  
  defenderOrbit++;
}

function createRangeTravel(def,counter,strength){
  if(counter === 0){
    console.log(counter);

    Matter.Body.setVelocity(def.body, {x: strength, y: strength * (-1)})

    counter++;
  }
}