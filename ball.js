class Ball{
    constructor(x, y, r, g, b){
        var ball_options = {
            frictionAir: 0.015,
            restitution: 1
        }

        this.body = Bodies.circle(x, y, 25, ball_options);
        this.width = 25;
        
        this.r = r;
        this.g = g;
        this.b = b;
        
       
        this.inPlay = true;

        World.add(world, this.body);
    }
    display(){
     
            //create the striker
            ellipseMode(RADIUS);
            fill(this.r, this.g, this.b);

            push();
            translate(this.body.position.x, this.body.position.y);
            rotate(this.body.angle);

            stroke("black");
            strokeWeight(3);

            circle(0, 0, this.width);

            noStroke();
            fill("blue");
            circle(0, 0, this.width - 8);

           
            pop();
        
    }
}