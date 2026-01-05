export interface Exercise {
  id: string;
  name: string;
  category?: string;
  defaultSets: number;
  defaultReps: number;
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
}
