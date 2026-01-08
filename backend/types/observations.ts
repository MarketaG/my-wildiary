import { ObjectId } from "mongodb";

// base
type ObservationBase = {
  title: string;
  description: string;
  createdAt: string; // ISO string
  habitat: string;
  weather: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
};

export type Animal = {
  species: string;
  commonName: string;
  conservationStatus: string;
  diet: string;
};

export type User = {
  name: string;
  password: string;
};

// observation data from JSON (without references)
export type ObservationInput = ObservationBase;

// complete observation in database (with references)
export type Observation = ObservationBase & {
  userId: ObjectId;
  animalId: ObjectId | undefined;
};

// database documents (with _id)
export type AnimalDocument = Animal & {
  _id: ObjectId;
};

export type ObservationDocument = Observation & {
  _id: ObjectId;
};

// utility
export type IndexDefinition = Record<string, "text" | 1 | -1>;
