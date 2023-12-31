# Micrograd TS

> This is a TypeScript version of [karpathy/micrograd](https://github.com/karpathy/micrograd) repo.<br />
> A tiny scalar-valued autograd engine and a neural net on top of it ([~200 lines](./micrograd/) of TS code).

This repo might be useful for those who want to get a basic understanding of how neural networks work, using a TypeScript environment for experimentation.  

## Project structure

- [micrograd/](./micrograd/) — this folder is the core/purpose of the repo
  - [engine.ts](./micrograd/engine.ts) — the scalar `Value` class that supports basic math operations like `add`, `sub`, `div`, `mul`, `pow`, `exp`, `tanh` and has a `backward()` method that calculates a derivative of the expression, which is required for back-propagation flow.
  - [nn.ts](./micrograd/nn.ts) — the `Neuron`, `Layer`, and `MLP` (multi-layer perceptron) classes that implement a neural network on top of the differentiable scalar `Values`.
- [demo/](./demo/) - demo React application to experiment with the micrograd code
  - [src/demos/](./demo/src/demos/) - several playgrounds where you can experiment with the `Neuron`, `Layer`, and `MLP` classes.

## Micrograd

See the 🎬 [The spelled-out intro to neural networks and back-propagation: building micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0) YouTube video for the detailed explanation of how neural networks and back propagation work. The video also explains in detail what the `Neuron`, `Layer`, `MLP`, and `Value` classes do.

Briefly, the `Value` class allows you to build a computation graph for some expression that consists of scalar values.

Here is an example of how the computation graph for the `a * b + c` expression looks like:

![graph-1.png](./demo/src/assets/graph-1.png)

Based on the `Value` class we can build a `Neuron` expression `X * W + b`. Here we're simulating a dot-product of matrix `X` (input features) and matrix `W` (neuron weights):

![graph-2.png](./demo/src/assets/graph-2.png)

Out of `Neurons`, we can build the `MLP` network class that consists of several `Layers` of `Neurons`. The computation graph in this case may look a bit complex to be displayed here, but a simplified version might look like this:

![graph-3.png](./demo/src/assets/graph-3.png)

The main idea is that the computation graphs above "know" how to do automatic back propagation (in other words, how to calculate derivatives). This allows us to train the MLP network for several epochs and adjust the network weights in a way that reduces the ultimate loss:

![training-1.gif](./demo/src/assets/training-1.gif)

## Demo (online)

To see the online demo/playground, check the following link:

🔗 [trekhleb.dev/micrograd-ts](https://trekhleb.dev/micrograd-ts)

## Demo (local)

If you want to experiment with the code locally, follow the instructions below.

### Setup

Clone the current repo locally.

Switch to the demo folder:

```sh
cd ./demo
```

Setup node v18 using [nvm](https://github.com/nvm-sh/nvm) (optional):

```sh
nvm use
```

Install dependencies:

```sh
npm i
```

Launch demo app:

```sh
npm run dev
```

The demo app will be available at [http://localhost:5173/micrograd-ts](http://localhost:5173/micrograd-ts)

### Playgrounds

Go to the [./demo/src/demos/](./demo/src/demos/) to explore several playgrounds for the `Neuron`, `Layer`, and `MLP` classes.

# Author

The TypeScript version of the [karpathy/micrograd](https://github.com/karpathy/micrograd) repo by [@trekhleb](https://trekhleb.dev)
