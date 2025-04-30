import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCharacters } from '../interfaces/rest-characters.interface';
import { Character } from '../interfaces/character.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { EpisodesService } from '../../episodes/services/episodes-service';
import { CharacterMapper } from '../mapper/character.mapper';


const API_URL = 'https://rickandmortyapi.com/api';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) {}

  private episodesService = inject(EpisodesService);

  $characters = signal<Character[]>([]);
  $characterSelected= signal<Character | null>(null);

  $totalPages = signal(0);
  $actualPage = signal(1);

  $isSearching = signal(false); //Por el Paginador
  $currentQuery = signal('');

  $isError = signal<string| null >(null);

  getCharacters(page: number = 1): void{
    this.$isSearching.set(false);

     this.http.get<RESTCharacters>(`${API_URL}/character`,{
      params: {page}
      })
      .subscribe({
        next: (resp) =>{
          const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);

          this.$characters.set(characters);
          this.$totalPages.set(resp.info.pages);

          // Desplazar automáticamente al inicio de la página
           window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error:(err)=> {
          console.log("Error getCharaters: ",err);
          this.$characters.set([]);
          this.$isError.set("No se han encontrado persoanjes.");
        },
      })
  }

  searchCharacters(query: string, page: number = 1): Observable<Character[]> {
      this.$isSearching.set(true);

      query = query.toLowerCase();
      this.$currentQuery.set(query);

      return this.http.get<RESTCharacters>(`${API_URL}/character`, {
        params: { name: query, page }
      })
      .pipe(
          map((resp) =>{
            this.$totalPages.set(resp.info.pages);
            return CharacterMapper.mapApiItemToCharacterArray(resp.results);
          }),

          catchError((error) => {
            console.log('Error fetching: ', error);
            return throwError(() => new Error(`No se logró obtener personajes con el nombre " ${query} "`));
          })

      )
  }

  getCharacterById(id: number): void {
    this.$isSearching.set(false);
    this.http.get<Character>(`${API_URL}/character/${id}`)
    .subscribe({
      next: (character) =>{
        this.$characterSelected.set(character);
        this.episodesService.getCharacterEpisodes(character)
        console.log(character);
      },
      error:(err)=> {
        console.log("Error getCharacterById: ",err);
        this.$isError.set("No se ha encontrado el persoanje.");
      },
    })
  }

  //* SEARCH: Retornando un array vacío en aso de error
 /* searchCharacters2(query: string, page: number = 1): Observable<Character[]> {
    this.$isSearching.set(true);
    query = query.toLowerCase();
    this.$currentQuery.set(query);

    this.http.get<RESTCharacters>(`${API_URL}/character`, {
      params: { name: query, page }
    })
    .pipe(
      map((resp) => {
        this.$totalPages.set(resp.info.pages);
        return CharacterMapper.mapApiItemToCharacterArray(resp.results);
      }),
      catchError((error) => {
        console.log('Error fetching', error);
        this.$totalPages.set(0); // Reiniciar páginas si hubo error
        return of([]); // devolvemos un array vacío, así el flujo sigue
      })
    );
  }
*/

  /* // SIN EL SUBSCRIBE
  getCharacterById(id: number): void {
    this.isSearching.set(false);
    this.http.get<Character>(`${this.baseUrl}/character/${id}`)
    .pipe(
      map((resp) =>{
        this.$characterSelected.set(resp);
        return CharacterMapper.mapApiItemToCharacterArray(resp.results);
      }),

      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se logró obtener personajes con el nombre " ${query} "`));
      })
  )
  }
*/

}


