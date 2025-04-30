export interface Character {
  id: number;
  name: string;
  status: Status;
  species: Species;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
}

export interface Location {
  name: string;
  url: string;
}//Esta es la interface de una ciudad(ponele)
// Guarda el nombre de una ciudad y un URL donde puedo guardar mas info de la ciudad si la necesito


//------------- Enums ----------------
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
