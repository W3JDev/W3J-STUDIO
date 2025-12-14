export interface MousePosition {
  x: number;
  y: number;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  image: string;
  client?: string;
  year?: string;
  services?: string[];
  description?: string;
  challenge?: string;
  solution?: string;
  gallery?: string[];
}