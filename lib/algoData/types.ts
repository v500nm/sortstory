export interface AlgorithmDetailsData {
  id: string;
  name: string;
  description: string;
  bestCase: string;
  avgCase: string;
  worstCase: string;
  timeComplexity: string;
  spaceComplexity: string;
  useCase: string;
  algorithmFlow: string[];
  codeSnippets: {
    javascript?: string;
    python?: string;
    java?: string;
    cpp?: string;
  };
  examples: {
    title: string;
    description: string;
    code: string;
  }[];
}
