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
  type: "modules" | "learningPaths";
};

export type MsLearnCatalogResponse = {
  modules?: Omit<MsLearnItem, "type">[];
  learningPaths?: Omit<MsLearnItem, "type">[];
};