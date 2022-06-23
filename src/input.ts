import { Key } from "readline";

export const startInputLoop = (callback: (key: Key) => void) => {
  process.stdin.on("keypress", (_, key: Key) => {
    callback(key);
  });
};
