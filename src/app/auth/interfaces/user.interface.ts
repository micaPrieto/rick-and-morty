import { Address } from './address.interface';

export interface User {
  id?: string;
  role?: string;
  fullName?: string;
  email: string;
  password: string;
  address?: Address;
  birthday?: Date;
  phone?: string;
}
