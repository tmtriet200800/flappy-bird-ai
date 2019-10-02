class Bird
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.velY = 0;
        this.radius = 0;
        this.died = 0;
        this.score = 0;
        this.color = 255;
        this.fitness = 0;

        this.brain = new NeuralNetwork(4,1,1);
    }

    start()
    {
        this.x = 100;
        this.y = height / 2;
        this.radius = 10;
        this.gravity = gravity;
        this.died = 0;
        this.score = 0;
        this.fitness = 0;
    }

    flap()
    {
        this.velY = -10;
    }

    show()
    {
        fill(this.color);
        ellipse(this.x,this.y,this.radius*2,this.radius*2);
    }

    update()
    {
        this.y += this.velY;

        if(this.y >= height - this.radius)
        {
            this.velY = 0;
            this.y = height - this.radius;    
        }
        else
        {
            this.velY += this.gravity;
        }
    }

    think(pipe_bot, pipe_top)
    {
        let input = [];

        input[0] = pipe_bot.x;
        input[1] = pipe_bot.y;
        input[2] = pipe_top.y;
        input[3] = this.y;

        let ypred = this.brain.predict(input);
      
        if(ypred >= 0.5)
        {
            this.flap();
        }
    }

    checkDied(pipe_bot,pipe_top)
    {
        if(this.y >= height - this.radius ||   collisionDetect(this) == true)
        {
          this.died = 1;
          this.color = 100;
        }
    }

    calScore(pipe_bot, pipe_top)
    {
        if(this.x >= pipe_bot.x - 2 && this.x <= pipe_bot.x + 2 && this.died == 0)
        {
          this.score++;
        }
    }

    calFitness(total_score)
    {
        this.fitness = this.score / total_score
    }
}