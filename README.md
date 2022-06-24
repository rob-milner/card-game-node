# card-game-node

A Node application written in TypeScript which implements a card game where a shuffled deck is split between two players,<br/>
cards are drawn with the highest value scoring a point. When the cards have run out, the player with the highest score wins.

## Prerequisites

Node must be installed to run this program. Installation instructions can be found here https://nodejs.org/.

## Installing the dependencies

Before running the program, the dependencies must be installed. This can be done with the command `npm install`.

## Building the project

Once the dependencies have been installed, the project can be built with the command `npm run build`.<br/>
This will compile the TypeScript into JavaScript and place the output in the `dist` folder.

## Running the game

When the game is built, you can run it with the command `npm run run:js`. This will use the built code in the dist folder.<br/>
Alternatively, you can run by using `npm run run:ts`. This will compile and run the typescript file,<br/>
so does not require building, however the startup is slower.

## Running the tests

Jest is used for testing and the tests can be run with the command `npm run test`.
The tests can also be run in watch mode with the command `npm run test:watch`.

## Linting

Eslint is used to check the code. Linting can be performed with the command `npm run lint`.
This will run the linter and fix any issues it can.

## Formatting

Prettier is used to format the code. The command `npm run format:write` will format the code and apply the changes with Prettier.
Using `npm run format:check` will format the code, but not apply the changes. This can be used to review any formatting issues.

## Debugging

A `launch.json` is provided in the `.vscode` folder which enables easy debugging of the main program when using VSCode.
From the VSCode `Run and Debug `tab, select the `Debug main.ts` target and use the green play button to start debugging.
The program should run and hit any breakpoints in the code.
