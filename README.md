# Micrograd TS

A tiny scalar-valued autograd engine and a neural net library on top of it with PyTorch-like API.

> - This is a TypeScript version of [karpathy/micrograd](https://github.com/karpathy/micrograd) repo.
> - See the [The spelled-out intro to neural networks and back-propagation: building micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0) YouTube video for the detailed  explanation of how neural networks and back propagation work.

This repo might be useful for those who want to get a basic yet deep understanding of how neural networks work, using a TypeScript environment for experimentation.  

## Project Structure

- [/micrograd](/micrograd/) — this folder is the core/purpose of the repo
  - [engine.ts](./micrograd/engine.ts) — the scalar `Value` class that supports basic math operations like `add`, `sub`, `div`, `mul`, `pow`, `exp`, `tanh` and has a `backward()` method that allows calculating a derivative of the expression, which is required for back-propagation flow.
  - [nn.ts](./micrograd/nn.ts) — the `Neuron`, `Layer`, and `MLP` (Multi-layer perceptron) classes that implement a neural network on top of the differentiable scalar `Values`. 