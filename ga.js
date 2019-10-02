function nextGen(total,saved_birds)
{
    for (let i = 0; i < total; i++) {
        birds[i] = new Bird();

        birds[i].brain = saved_birds[i].brain;
    }
}

function crossOver(pre_bird, parentA, parentB)
{
    // Cross-over

    // console.log(pre_bird);

    //console.log(pre_bird.brain.model.getWeights()[0].dataSync())

    let child = pre_bird;

    // console.log(child);

    // let weightA = parentA.brain.model.getWeights();
    // let weightB = parentB.brain.model.getWeights();

    let weight_input = child.brain.model.getWeights();

    let child_weight = [];

    child_weight.push(weight_input[0]);
    child_weight.push(weight_input[1]);
    child_weight.push(weight_input[2]);
    child_weight.push(weight_input[3]);

    // Mutation

    for(let i = 0; i < child_weight.length; i++)
    {
        child_weight[i] = mutate(child_weight[i]);
    }


    child.brain.model.setWeights(child_weight);

    return child;
}

function mutate(weights)
{
    let values = weights.dataSync();
    
    for(let i = 0; i < values.length; i++)
    {
        if(random(1) < mutate_rate)
        {
            values[i] += randomGaussian();
        }
    }
    
    let mutated_weights = tf.tensor(values,weights.shape);

    return mutated_weights;
}