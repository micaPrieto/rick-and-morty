import { Address } from './address.interface';

export interface User {
  id?: string;
  role?: string;
  name: string;
  mail: string;
  password: string;
  address?: Address;
  birthday?: Date;
  phone?: string;
}
