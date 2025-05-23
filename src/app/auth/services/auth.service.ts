import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { AuthResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/user.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

type AuthStatus = 'checking' | 'authenticated' |'not-authenticated'

const baseUrl = environment.usersBaseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(null)

  private http = inject(HttpClient);

  checkStatusResourse = rxResource ({
    loader: ( ) => this.checkStatus()
  }) //Esto se va a disparar ni bien se inyecte por primera vez


  //? ----------------------- GETTERS ---------------------
  authStatus = computed<AuthStatus> (()=> {
      if(this._authStatus() === 'checking') {
        return 'checking'
      }

      if(this._user()){
        return 'authenticated'
      }
      return 'not-authenticated'
    })

  user = computed<User | null> (()=> this._user());

  token = computed(this._token);

  //? ------------------------------------------------------

  login(mail: string, password: string): Observable <boolean>
  {
    return this.http.post<AuthResponse>
    (
      `${baseUrl}/user/login`,{
        mail: mail,
        password: password,
      })
      .pipe(
        map((resp)=> this.handleAuthSuccess(resp) ), // Regresa un true
        catchError((error: any) => this.handleAuthError(error))
      )
  }

  register(user: User): Observable <boolean>
  {
    return this.http.post<AuthResponse>(`${baseUrl}/user/register`,user)
      .pipe(
        map(()=> true ),
        catchError((error: any) => { return throwError(() => error);
        })
      )
  }

  checkStatus(): Observable<boolean> {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      this.logOut();
      return of(false);
    }

    this._token.set(token);
    this._user.set(JSON.parse(user));
    this._authStatus.set('authenticated');

    return of(true);
  }


  //Manejar el ÉXITO
  private handleAuthSuccess(resp: AuthResponse)
  {
    this._user.set(resp.data.user);
    this._authStatus.set('authenticated');
    this._token.set(resp.data.token);

    localStorage.setItem('token', resp.data.token);
    localStorage.setItem('user', JSON.stringify(resp.data.user));

     return true;
  }

  //Manejar el ERROR
  private handleAuthError(error: any){
    this.logOut();
    return throwError(() => error);
  }

  logOut(){
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    console.log('Usuario no autenticado. Status:', this._authStatus());
  }


}
