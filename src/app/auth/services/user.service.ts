import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, tap, throwError } from 'rxjs';

import { AuthResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/user.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { Episode } from '../../episodes/interfaces/episode.interface';
import { EpisodesService } from '../../episodes/services/episodes-service';

type AuthStatus = 'checking' | 'authenticated' |'not-authenticated'

const baseUrl = environment.usersBaseUrl;

@Injectable({providedIn: 'root'})
export class UserService {

  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(null)

 favoritesEpisodes = new BehaviorSubject<Episode[]| null>(null);

  private http = inject(HttpClient);

  private episodesService = inject(EpisodesService);

  checkStatusResourse = rxResource ({
    loader: ( ) => this.checkStatus()
  })


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

  login(email: string, password: string): Observable <boolean>
  {
    console.log(email);
    console.log(password);

    return this.http.post<AuthResponse>
    (
      `${baseUrl}/login`,{
        email: email,
        password: password,
      })
      .pipe(
        tap(resp => console.log('Respuesta del backend:', resp)),
        map((resp)=> this.handleAuthSuccess(resp) ),
          catchError((error: any) => {
          console.error('Login error:', error);
           return this.handleAuthError(error);
        })
      )
  }

  register(user: User): Observable <boolean>
  {
    console.log(user);
    return this.http.post<AuthResponse>(`${baseUrl}/register`,user)
      .pipe(
        map(()=> true ),
        catchError((error: any) => { return throwError(() => error);
        })
      )
  }

  checkStatus(): Observable<boolean> {

    const token = localStorage.getItem('token');
    const userString  = localStorage.getItem('user');
    const favoritesString = localStorage.getItem('favoritesEpisodes');


    if (!token || !userString ) {
      this.logOut();
      return of(false);
    }

    const user = JSON.parse(userString );

    this._token.set(token);
    this._user.set(user);
    this._authStatus.set('authenticated');

    if (favoritesString) {
    const favorites = JSON.parse(favoritesString);
    this.favoritesEpisodes!.next(favorites);
    } else if (user.episodesFavorites?.length) {
      this.getFavoriteEpisodesByIds(user.episodesFavorites);
    }

    return of(true);
  }


  //TODO:  NO GUARDAR EN EL LOCAL STORAGE , SOLO SERVICIO
  getFavoriteEpisodesByIds(episodeIds: string[]): void {
    const episodeRequests = episodeIds.map(id =>
      this.episodesService.getEpisodeById$(id)
    );

    forkJoin(episodeRequests).subscribe({
      next: (episodes) => {
        this.favoritesEpisodes!.next(episodes);
        localStorage.setItem('favoritesEpisodes', JSON.stringify(episodes));
        console.log('Episodios favoritos:', episodes);
      },
      error: (err) => {
        console.error('Error al obtener episodios favoritos:', err);
      }
    });
  }

  addFavoriteEpisode(episodeId: string): Observable<string[]> {
    const token = this.token();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<{ favorites: string[] }>(
      `${baseUrl}/favorites/${episodeId}`,
      {},
      { headers }
    ).pipe(
      tap(resp => {
        localStorage.setItem('favoritesEpisodes', JSON.stringify(resp.favorites));
        this.getFavoriteEpisodesByIds(resp.favorites);
      }),
      map(resp => resp.favorites)
    );
  }

  removeFavoriteEpisode(episodeId: string): Observable<string[]> {
    const token = this.token();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log('TOKEN ACTUAL:', this.token());

    return this.http.delete<{ episodesFavorites: string[] }>(
        `${baseUrl}/favorites/${episodeId}`,
        { headers }
      )
      .pipe(
        tap(resp => {
          localStorage.setItem('favoritesEpisodes', JSON.stringify(resp.episodesFavorites));
          this.getFavoriteEpisodesByIds(resp.episodesFavorites);
        }),
        map(resp => resp.episodesFavorites)
      );
  }

  uploadProfileImage(file: File): Observable<{ message: string; profileImage: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<{ message: string; profileImage: string }>(
      `${baseUrl}/upload-profile-image`,
      formData,
      { headers }
    ).pipe(
      tap((resp) => {
        console.log('Imagen subida correctamente:', resp);
        if (this._user()) {
          this._user.set({
            ...this._user()!,
            profileImage: resp.profileImage
          });
          localStorage.setItem('user', JSON.stringify(this._user()));
        }
      }),
      catchError((error) => {
        console.error('Error al subir imagen:', error);
        return throwError(() => error);
      })
    );
  }

  updateUser(userData: Partial<User>): Observable<{ message: string; user: User }> {
    const token = this.token();

    if (!token) {
      return throwError(() => new Error('No hay token de autenticación'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch<{ message: string; user: User }>(
      `${baseUrl}/edit-profile`,
      userData,
      { headers }
    ).pipe(
      tap((resp) => {
        console.log('Usuario actualizado:', resp);
        this._user.set(resp.user);
        localStorage.setItem('user', JSON.stringify(resp.user));
      }),
      catchError((error) => {
        console.error('Error al actualizar usuario:', error);
        return throwError(() => error);
      })
    );
  }

 handleAuthSuccess(resp: AuthResponse) {
    console.log('handleAuthSuccess resp:', resp);

    localStorage.removeItem('favoritesEpisodes');

    this._user.set(resp.user);
    this._authStatus.set('authenticated');
    this._token.set(resp.token);

    localStorage.setItem('token', resp.token);
    localStorage.setItem('user', JSON.stringify(resp.user));

    if (resp.user.episodesFavorites?.length) {
      this.getFavoriteEpisodesByIds(resp.user.episodesFavorites);
    } else {
      this.favoritesEpisodes.next([]);
    }

    return true;
  }

    //Manejar el ERROR
  handleAuthError(error: any){
    this.logOut();
    return throwError(() => error);
  }

  logOut(){
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favoritesEpisodes');

    console.log('Usuario no autenticado. Status:', this._authStatus());
  }



}
