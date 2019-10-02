// Inputs node: 4
// Hidden node: 4
// Output node: 1

class NeuralNetwork
{
    constructor(input_size,hidden_size,output_size)
    {
        this.input_size = input_size;
        this.hidden_size = hidden_size;
        this.output_size = output_size;

        this.input = tf.input({shape: [input_size]});
        this.hidden = tf.layers.dense({units: hidden_size, activation: 'relu'});
        this.output = tf.layers.dense({units: output_size, activation: 'sigmoid'}).apply(this.hidden.apply(this.input))
        this.model = tf.model({inputs: this.input, outputs: this.output})
    }

    predict(xVal)
    {
        let predict_value = tf.tidy(()=>{

            let input_tensor = tf.tensor(xVal,[1,this.input_size]);

            // input_tensor = input_tensor.sub(input_mean).div(input_std);
    
            input_tensor = input_tensor.sub(input_tensor.min()).div(input_tensor.max().sub(input_tensor.min()));

            return this.model.predict(input_tensor).dataSync();
        })

        return predict_value;
    }
}





