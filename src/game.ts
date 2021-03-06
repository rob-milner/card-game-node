import { emitKeypressEvents, Key } from "readline";
import { startInputLoop } from "./input";
import {
  displayEndingMessage,
  displayResultsTableHeader,
  displayRoundStatus,
  displayWelcomeMessage,
} from "./output";

const DECK_SIZE = 52;

export type Deck = number[];

type DrawCardResult = {
  card: number;
  deck: Deck;
};

type Player = {
  name: string;
  score: number;
  deck: Deck;
  card: number;
};

export type Players = Record<number, Player>;

type PlayRoundResult = {
  players: Players;
  gameOver: boolean;
};

export const newDeck = (): Deck => {
  const deck: Deck = [];
  for (let i = 1; i <= DECK_SIZE; i++) {
    deck.push(i);
  }
  return deck;
};

export const shuffle = (deck: Deck): Deck => {
  const copy = deck.slice(0);

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

export const deal = (deck: Deck): [Deck, Deck] => {
  const half = Math.ceil(deck.length / 2);
  return [deck.slice(0, half), deck.slice(-half)];
};

export const drawCard = (deck: Deck): DrawCardResult => {
  const copy = [...deck];
  return { card: copy.pop() ?? 0, deck: copy };
};

export const compareScore = (player1: number, player2: number): number => {
  if (player1 === player2) {
    return 0;
  }

  return player1 > player2 ? 1 : 2;
};

export const awardPointToPlayer = (players: Players, key: number): Players => {
  const p = { ...players };
  p[key].score++;
  return p;
};

export const playRound = (players: Players): PlayRoundResult => {
  let p = { ...players };
  const p1Draw = drawCard(p[1].deck);
  const p2Draw = drawCard(p[2].deck);
  const winner = compareScore(p1Draw.card, p2Draw.card);
  p = awardPointToPlayer(p, winner);
  p[1] = { ...p[1], ...p1Draw };
  p[2] = { ...p[2], ...p2Draw };
  const gameOver = p[1].deck.length === 0;

  displayRoundStatus(p, winner);

  return { players: p, gameOver };
};

export const playGame = () => {
  const deck = shuffle(newDeck());
  const [deck1, deck2] = deal(deck);
  let players = {
    1: {
      name: "player 1",
      score: 0,
      deck: deck1,
      card: 0,
    },
    2: {
      name: "player 2",
      score: 0,
      deck: deck2,
      card: 0,
    },
  } as Players;

  displayWelcomeMessage();

  emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  let result: PlayRoundResult;

  startInputLoop((key: Key) => {
    const keyName = key?.name ?? "";
    if (key?.name === "escape") {
      process.exit();
    } else if (["space", "return"].includes(keyName)) {
      if (players[1].card === 0) {
        displayResultsTableHeader(players);
      }
      result = playRound(players);
      players = result.players;

      if (result.gameOver) {
        displayEndingMessage(players);

        process.stdin.setRawMode(false);
        process.exit();
      }
    }
  });
};
