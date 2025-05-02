import { Location } from "./location.interface";

export interface Character {
  id: number;
  name: string;
  status: "Alive" |"Dead" | 'unknown';
  species:"Alien" | "Human" |'Robot'| 'unknown';
  gender: 'Female' | 'Male' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
}


//------------- Enums ----------------
/*
// SEPARAR en diferentes componentes
export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export enum Species {
  Alien = "Alien",
  Human = "Human",
  Robot = 'Robot',
  Unknown = 'unknown',
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}

*/
