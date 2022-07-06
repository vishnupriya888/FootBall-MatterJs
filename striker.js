class Striker{
    constructor(x, y){
        var striker_options = {
            frictionAir: 0.015,
            mass: 7.5,
            restitution: 1
        }

        this.body = Bodies.circle(x, y, 25, striker_options);
        this.width = 25;
        this.inPlay = true;
        
        World.add(world, this.body);
    }

    display(){
        if(this.body.position.x >= 1000 && this.body.position.x <= 1650 && this.body.position.y>=110 && this.body.position.y<=600){
            Matter.World.remove(world, this.body);
            if(this.inPlay === true){
                window.score++;
                this.inPlay = false;
            }
        }else{
        //create the striker
        ellipseMode(RADIUS);
        fill("white");

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);

        stroke("black");
        strokeWeight(3);

        circle(0, 0, this.width);

       
        pop();
        }

    }
}