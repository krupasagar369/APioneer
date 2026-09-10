export type MsLearnItem = {
  uid: string;
  title: string;
  summary: string;
  url: string;
  levels: string[];
  products: string[];
  duration_in_minutes?: number;
  rating?: { average: number; count: number };
  icon_url?: string;
  roles?: string[];
  subjects?: string[];
  prerequisites?: string;
  // Modules: uids of the units that make up this module.
  units?: string[];
  // Learning paths: uids of the modules that make up this path.
  modules?: string[];
  type: "modules" | "learningPaths";
};

export type MsLearnUnit = {
  uid: string;
  title: string;
  summary?: string;
  duration_in_minutes?: number;
};

export type MsLearnCatalogResponse = {
  modules?: Omit<MsLearnItem, "type">[];
  learningPaths?: Omit<MsLearnItem, "type">[];
  units?: MsLearnUnit[];
};