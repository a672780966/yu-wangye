export interface ConstructionStep {
  id: string;
  number: string;
  name: string;
  zhName: string;
  description: string;
  governanceGate: string;
  evidenceType: string;
}

export interface ControlAxiom {
  id: string;
  number: string;
  statement: string;
  subtext: string;
  zhExplanation: string;
  mechanism: string;
}

export interface NodeAttribute {
  id: string;
  name: string;
  zhLabel: string;
  description: string;
  codeSnippet: string;
  badge: string;
}

export interface WorkbenchZone {
  id: string;
  name: string;
  question: string;
  description: string;
  activeNodes: number;
}

export type ProjectionType = 'PLANNING' | 'CONSTRUCTION' | 'IMPLEMENTATION';
