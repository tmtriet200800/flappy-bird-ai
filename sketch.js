let birds = [];
let saved_birds = [];
let matingPool = [];
let total = 250;
let total_score = 0;
let mutate_rate = 0.01;
let pipe_bot = new Pipe();
let pipe_top = new Pipe();


for (let i = 0; i < total; i++) {
  birds[i] = new Bird();
}

let gravity = 1;
let pipe_speed = 5;
let pipe_space = 150;
let pipe_width = 50;
let pipe_minimum_height = 100;
let pipe_maximum_height = 450;

function setup() {
  // put setup code her e
  createCanvas(800,600);
  // resetGame();

  for (let i = 0; i < total; i++) {
    birds[i].start();
  }

  pipe_bot.start();
  pipe_top.start();
  updateHeight(pipe_bot,pipe_top);

  tf.setBackend('cpu')

  let button = createButton("reset");
  button.mousePressed(resetGame)
}

function draw() {
  background(0);

  if(birds.length == 0)
  {
    // When 1 gen is finished
    // console.log(total_score)
    // console.log(saved_birds.length)

    // Building mating pool

    if(total_score > 0)
    {
      for(let i = 0; i < saved_birds.length; i++)
      {
        saved_birds[i].calFitness(total_score);
  
        for(let j = 0; j < saved_birds[i].fitness * 100; j++)
        {
          matingPool.push(saved_birds[i]);
        }
      }
  
  
      // GA stuff
  
      // Cross over
  
      //console.log(matingPool)
  
      for(let i = 0; i < saved_birds.length; i++)
      {
        let parentA = matingPool[int(random(matingPool.length))];
        let parentB = matingPool[int(random(matingPool.length))];
  
        // console.log(parentA)
        // console.log(parentB)
  
        let child = crossOver(saved_birds[i], parentA, parentB);

        saved_birds[i] = child

        console.log(saved_birds[i].brain.model.getWeights()[0].dataSync())

        // console.log(saved_birds[i]);
        // console.log(child);
      }
    }


    resetGame();
  }

  pipe_bot.show();
  pipe_bot.update();

  pipe_top.show();
  pipe_top.update();

  // fill(255,0,0);
  // textSize(50);
  // text(bird.score,50,50);

  for (let i = 0; i < birds.length; i++) 
  {
    birds[i].update();
    birds[i].show();
    birds[i].checkDied(pipe_bot,pipe_top);

    if(birds[i].died == 0)
    {
      birds[i].think(pipe_bot,pipe_top);
    }

    birds[i].calScore(pipe_bot,pipe_top);

    if(birds[i].died == 1)
    {
      total_score += birds[i].score;
    }
  }

  let temp_index = 0;

  while(temp_index < birds.length)
  {
    if(birds[temp_index].died == 1)
    {
      saved_birds.push(birds.splice(temp_index,1)[0]);
    }
    else
    {
      temp_index++;
    }
  }


  //create another pipe
  if (pipe_top.x >= width || pipe_bot.x >= width) {
    updateHeight(pipe_bot,pipe_top)
  }
  //console.log(tf.memory().numTensors)
}

// function mousePressed()
// {
//   if(bird.died == 0)
//   {
//     bird.flap();
//   }
// }

//set random height for pipe
function updateHeight()
{
  pipe_bot.height = random(pipe_minimum_height,pipe_maximum_height);
  pipe_top.height = height - pipe_space - pipe_bot.height
  pipe_bot.y = height - pipe_bot.height/2;
  pipe_top.y = pipe_top.height/2;
}

//collision detection
function collisionDetect(bird)
{
  if(bird.x + bird.radius >= pipe_bot.x - pipe_bot.width/2 && bird.x - bird.radius <= pipe_bot.x + pipe_bot.width / 2)
  {
    if(bird.y + bird.radius >= pipe_bot.y - pipe_bot.height / 2 || bird.y - bird.radius <= pipe_top.y + pipe_top.height/2)
    {
      return true;
    }
  }

  //Make collision true can not change to false

  if(bird.died == 0)
  {
    return false;
  }
  else
  {
    return true;
  }
}

function resetGame()
{
  nextGen(total,saved_birds);

  for (let i = 0; i < total; i++) {
    birds[i].start();
  }

  pipe_bot.start();
  pipe_top.start();
  updateHeight(pipe_bot,pipe_top);

  total_score = 0;
  saved_birds = []
}