import { compareScore, Players } from "./game";

let round = 0;

export const displayRoundStatus = (players: Players, winner: number): void => {
  console.log(
    `\nround ${String(++round).padStart(2, "0")}\t${players[1].card}\t\t${
      players[2].card
    }\t\t${players[winner].name}`
  );
};

export const displayWelcomeMessage = (): void => {
  console.log(
    "Welcome to highest card wins. Two players will take turns drawing cards and the highest score gets a point.\nAt the end of the game, the player with the most points wins. Press space to begin."
  );
};

export const displayEndingMessage = (players: Players): void => {
  console.log("\nThe game has finished!\n\n");
  console.log(
    `${players[1].name} got ${players[1].score}, ${players[2].name} got ${players[2].score}.`
  );
  const winner = compareScore(players[1].score, players[2].score);
  if (winner === 0) {
    console.log(`\nThat means the game is a draw!`);
  } else {
    console.log(`\nThat means ${players[winner].name} is the winner!`);
  }

  console.log("\nThanks for playing!");
};

export const displayResultsTableHeader = (players: Players): void => {
  console.log(`\n\t\t${players[1].name}\t${players[2].name}\twinner`);
};
