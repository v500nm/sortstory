import { searchingData } from "./searchingData";
import { pathfindingData } from "./pathfindingData";
import { linkedListData } from "./linkedListData";
import { treeData } from "./treeData";
import { graphData } from "./graphData";
import { automataData } from "./automataData";
import { AlgorithmDetailsData } from "./types";

export const allAlgoData: Record<string, AlgorithmDetailsData> = {
  ...searchingData,
  ...pathfindingData,
  ...linkedListData,
  ...treeData,
  ...graphData,
  ...automataData
};

export type { AlgorithmDetailsData };
