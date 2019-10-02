class Pipe
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.valX = 0;
    }
    start()
    {
        this.width = pipe_width;
        this.x = width*5/6;
        this.valX = pipe_speed;
    }
    show()
    {
        fill(0,255,0);
        rectMode(CENTER);
        rect(this.x,this.y,this.width,this.height);
    }
    update()
    {
        this.x -= this.valX

        if(this.x <= 0 - this.width/2)
        {
            this.x = width + this.width/2;
        }
    }
}