// src/types.ts
export interface Diary {
  id: number;
  date: string;
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  visibility: "great" | "good" | "ok" | "poor";
  comment?: string;
}
