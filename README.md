# Micrograd TS

A tiny scalar-valued autograd engine and a neural net on top of it.

> - This is a TypeScript version of [karpathy/micrograd](https://github.com/karpathy/micrograd) repo.
> - See the [The spelled-out intro to neural networks and back-propagation: building micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0) YouTube video for the detailed  explanation of how neural networks and back propagation work.

This repo might be useful for those who want to get a basic yet deep understanding of how neural networks work, using a TypeScript environment for experimentation.  

## Project structure

- [micrograd/](./micrograd/) — this folder is the core/purpose of the repo
  - [engine.ts](./micrograd/engine.ts) — the scalar `Value` class that supports basic math operations like `add`, `sub`, `div`, `mul`, `pow`, `exp`, `tanh` and has a `backward()` method that calculates a derivative of the expression, which is required for back-propagation flow.
  - [nn.ts](./micrograd/nn.ts) — the `Neuron`, `Layer`, and `MLP` (multi-layer perceptron) classes that implement a neural network on top of the differentiable scalar `Values`.
- [demo/](./demo/) - demos/playgrounds to experiment with the micrograd code
  - [src/demos/](./demo/src/demos/) - several playgrounds where you can experiment with the `Neuron`, `Layer`, and `MLP` classes.

## Demo

### Setup

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

The demo app will be available at `http://localhost:5173/`

# Author

[@trekhleb](https://trekhleb.dev)
