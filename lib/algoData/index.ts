import { searchingData } from "./searchingData";
import { pathfindingData } from "./pathfindingData";
import { linkedListData } from "./linkedListData";
import { treeData } from "./treeData";
import { graphData } from "./graphData";
import { automataData } from "./automataData";
import { sortingData } from "./sortingData";
import { AlgorithmDetailsData } from "./types";

export const allAlgoData: Record<string, AlgorithmDetailsData> = {
  ...searchingData,
  ...pathfindingData,
  ...linkedListData,
  ...treeData,
  ...graphData,
  ...automataData,
  ...sortingData
};

export type { AlgorithmDetailsData };
