import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { firstValueFrom } from "rxjs";


export const NotAuthenticatedGuard = async()=>{

  const router = inject(Router);
  const authService = inject(AuthService);

  //const isAuthenticated  = authService.authStatus(); //Podriamos usar esto, pero no se tendria en cuenta el estado 'checking',
 // por eso tenemos que hacer el async await

  const isAuthenticated  = await firstValueFrom(authService.checkStatus()) ;
  console.log('NOT -isAuthenticated: ', isAuthenticated);

  if(isAuthenticated) // Si estoy logado
  {
    console.log(authService.user);
    router.navigateByUrl('characters')
    return false;
  }

  return true;
}
