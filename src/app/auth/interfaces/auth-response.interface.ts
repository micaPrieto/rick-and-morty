import { User } from "./user.interface";

export interface AuthResponse {
  /*
   id: string;
  email: string;
  password: string;
  token: string;
  */
  user: User;
  token: string;
}




/*
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
*/

