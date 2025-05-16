import { Address } from "./address.interface";

export interface User  {
    name: string,
    mail:string,
    password:string,
    address?: Address,
}
