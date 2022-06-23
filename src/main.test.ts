import {
  newDeck,
  shuffle,
  deal,
  drawCard,
  compareScore,
  awardPointToPlayer,
  playRound,
  Deck,
  Players,
} from "./main";

const orderedDeck = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];

describe("newDeck", () => {
  let deck: Deck;
  beforeEach(() => {
    deck = newDeck();
  });

  it("has the correct length", () => {
    expect(deck).toHaveLength(52);
  });

  it("has the correct values", () => {
    expect(deck).toStrictEqual(orderedDeck);
  });
});

describe("shuffle", () => {
  let deck: Deck;
  beforeEach(() => {
    deck = newDeck();
  });

  it("returns a deck of the same length", () => {
    const shuffled = shuffle(deck);
    expect(shuffled).toHaveLength(52);
  });

  it("mixes up the cards differently each time it is run", () => {
    const shuffledHistory = [orderedDeck];

    for (let i = 0; i < 10; i++) {
      const shuffled = shuffle(deck);
      const match = shuffledHistory.find(
        (s) => s.toString() === shuffled.toString()
      );
      expect(match).toBe(undefined);
      shuffledHistory.push(shuffled);
    }
  });
});

describe("deal", () => {
  let p1Cards: Deck, p2Cards: Deck;

  beforeEach(() => {
    const deck = shuffle(newDeck());
    [p1Cards, p2Cards] = deal(deck);
  });

  it("splits the deck between the two players", () => {
    expect(p1Cards).toHaveLength(26);
    expect(p2Cards).toHaveLength(26);
  });

  it("has unique cards for each player", () => {
    const intersection = p1Cards.filter((card) => p2Cards.includes(card));
    expect(intersection).toHaveLength(0);
  });

  it("includes the whole deck between both players", () => {
    const combined = [...p1Cards, ...p2Cards].sort((a, b) => a - b);
    expect(combined).toEqual(orderedDeck);
  });
});

describe("drawCard", () => {
  let startingDeck: Deck;

  beforeEach(() => {
    startingDeck = [1, 2, 3];
  });

  it("returns the value of the topmost card in the deck", () => {
    const { card } = drawCard(startingDeck);
    expect(card).toBe(3);
  });

  it("removes the topmost card from the deck", () => {
    const { deck } = drawCard(startingDeck);
    expect(deck).toEqual([1, 2]);
  });

  it("returns 0 and an empty deck when a deck is empty", () => {
    const { card, deck } = drawCard([]);
    expect(card).toBe(0);
    expect(deck).toEqual([]);
  });
});

describe("compareScore", () => {
  it("returns the player number with the highest card", () => {
    expect(compareScore(7, 5)).toBe(1);
    expect(compareScore(3, 4)).toBe(2);
  });
});

describe("awardPoint", () => {
  it("increases the score of the winning player", () => {
    let players = {
      1: { name: "p1", score: 0, deck: [] },
      2: { name: "p2", score: 0, deck: [] },
    } as Players;

    players = awardPointToPlayer(players, 1);

    expect(players[1].score).toBe(1);
    expect(players[2].score).toBe(0);

    players = awardPointToPlayer(players, 2);
    players = awardPointToPlayer(players, 2);

    expect(players[1].score).toBe(1);
    expect(players[2].score).toBe(2);
  });
});

describe("playRound", () => {
  let players: Players;

  beforeEach(() => {
    players = {
      1: { name: "p1", score: 0, deck: [1, 2] },
      2: { name: "p2", score: 0, deck: [3, 4] },
    };
  });

  it("signals the game has not ended while there are still cards left to play", () => {
    const { gameOver } = playRound(players);
    expect(gameOver).toBe(false);
  });

  it("signals the game has ended when there are no more cards to play", () => {
    const players = {
      1: { name: "p1", score: 0, deck: [1] },
      2: { name: "p2", score: 0, deck: [2] },
    };
    const { gameOver } = playRound(players);
    expect(gameOver).toBe(true);
  });

  it("removes the topmost card after playing a round", () => {
    const result = playRound(players);
    expect(result.players[1].deck).toEqual([1]);
    expect(result.players[2].deck).toEqual([3]);
  });

  it("awards points after playing a round", () => {
    const result = playRound(players);
    expect(result.players[1].score).toEqual(0);
    expect(result.players[2].score).toEqual(1);
  });
});
