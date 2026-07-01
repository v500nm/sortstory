import { dijkstra } from "./algorithms/dijkstra";
import { aStar } from "./algorithms/aStar";
import { recursiveBacktracking } from "./algorithms/mazes/recursiveBacktracking";
import { primsMaze } from "./algorithms/mazes/primsMaze";

export const pathfindingAlgorithms = {
  dijkstra,
  aStar,
};

export const mazeAlgorithms = {
  recursiveBacktracking,
  primsMaze,
};
