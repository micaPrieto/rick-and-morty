import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiItem, RESTCharacters } from '../interfaces/characters/rest-characters.interface';
import { Character } from '../interfaces/characters/character.interface';
import { CharacterMapper } from '../mapper/character.mapper';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { EpisodesService } from './episodes-service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) {}


  private episodesService = inject(EpisodesService);

  private baseUrl = 'https://rickandmortyapi.com/api';

  $characters = signal<Character[]>([]);
  $totalPages = signal(0);
  $characterSelected= signal<Character | null>(null);

  isSearching = signal(false);
  currentQuery = signal('');

  $actualPage = signal(1);

  $isError = signal<string| null >(null);

  getCharacters(page: number = 1): void{
    this.isSearching.set(false);
     this.http.get<RESTCharacters>(`${ this.baseUrl}/character`,{
      params: {page}
      })
      .subscribe({
        next: (resp) =>{
          const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);

          this.$characters.set(characters);
          this.$totalPages.set(resp.info.pages);

        },
        error:(err)=> {
          console.log("Err:",err);
          this.$characters.set([]);
          this.$isError.set("No se han encontrado persoanjes.");
        },
      })
  }

  getCharacterById(id: number): void {
    this.isSearching.set(false);
    this.http.get<Character>(`${this.baseUrl}/character/${id}`)
    .subscribe({
      next: (character) =>{
        this.$characterSelected.set(character);
        this.episodesService.getCharacterEpisodes(character)

        console.log(character);
      },
      error:(err)=> {
        console.log("Err:",err);
        this.$isError.set("No se ha encontrado el persoanje.");
      },
    })
  }
  /*
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
  searchCharacters(query: string, page: number = 1): Observable<Character[]> {
      this.isSearching.set(true);
      query = query.toLowerCase();
      this.currentQuery.set(query);

      return this.http.get<RESTCharacters>(`${this.baseUrl}/character`, {
        params: { name: query, page }
      })
      .pipe(

          map((resp) =>{
            this.$totalPages.set(resp.info.pages);
            return CharacterMapper.mapApiItemToCharacterArray(resp.results);
          }),

          catchError((error) => {
            console.log('Error fetching', error);
            return throwError(() => new Error(`No se logró obtener personajes con el nombre " ${query} "`));
          })

      )
  }




  /* Sin manejo de errores. Version Fernando
  getCharacters(page: number = 1): void
  {
      this.isSearching.set(false);
     this.http.get<RESTCharacters>(`${ this.baseUrl}/character`,{
      params: {page}
      }).subscribe( (resp) =>{
        const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);

        this.$characters.set(characters);
        this.$totalPages.set(resp.info.pages);
      })
  }
      */

}


