export type Animal = {
  _id: string;
  species: string;
  commonName: string;
  conservationStatus: string;
  diet: string;
};

export type User = {
  _id: string;
  name: string;
};

export type Observation = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  habitat: string;
  weather: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  userId: string;
  animalId: string;
  // Populated fields
  animal?: Animal;
  user?: User;
};

export type UpdateObservationInput = {
  title?: string;
  description?: string;
  habitat?: string;
  weather?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  animalId?: string;
};
