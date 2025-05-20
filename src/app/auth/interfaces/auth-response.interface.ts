import { User } from "./user.interface";

export interface AuthResponse {
  header: Header;
  data:   Data;
}

export interface Data {
  user: User;
  token: string;
}

export interface Header {
  message:    string;
  resultCode: number;
}


//! TODO: Volver a hacer con el resultado de un post real
