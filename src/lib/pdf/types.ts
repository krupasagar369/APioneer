export type BrochureData = {
  title: string;
  partner: string;
  category?: string;
  credential?: string;
  duration?: string;
  examDuration?: string;
  intro?: string;
  objectives?: string[];
  audience?: string[];
  prerequisites?: string[];
  outline?: { heading: string; points: string[] }[];
};