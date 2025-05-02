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

  constructor(
    private http: HttpClient,
    private episodesService: EpisodesService
  ) {}

  $characters = signal<Character[]>([]);
  $characterSelected= signal<Character | null>(null);

  $totalPages = signal<number>(0);
  $actualPage = signal<number>(1);

  $isSearching = signal<boolean>(false); //Por el Paginador
  $currentQuery = signal<string>('');

  $isError = signal<string| null >(null);

  getCharacters(page: number = 1): void
  {
    this.$isSearching.set(false);
    this.$isError.set(null);

     this.http.get<RESTCharacters>(`${API_URL}/character`,{
      params: {page}
      })
      .subscribe({
        next: (resp) =>{
          const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);

          this.$characters.set(characters);
          this.$totalPages.set(resp.info.pages);

           window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error:(err)=> {
          console.log("Error getCharaters: ",err);
          this.$characters.set([]);
          this.$isError.set("No se han encontrado persoanjes.");
        },
      })
  }

  searchCharacters(query: string, page: number = 1): void
  {
      this.$isSearching.set(true);
      this.$isError.set(null);

      query = query.toLowerCase();
      this.$currentQuery.set(query);

       this.http.get<RESTCharacters>(`${API_URL}/character`, {
        params: { name: query, page }
      })
      .subscribe({
        next: (resp) =>{
          this.$totalPages.set(resp.info.pages);
          const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);
          this.$characters.set(characters);

           window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error:(err)=> {
          console.log("Err:",err);
          this.$characters.set([]);
          this.$isError.set(`No se logró obtener personajes con el nombre: "${query}"`);
        },
      })
  }

  getCharacterById(id: number): void {
    this.$isSearching.set(false);
    this.http.get<Character>(`${API_URL}/character/${id}`)
    .subscribe({
      next: (character) =>{
        this.$characterSelected.set(character);
        this.episodesService.getCharacterEpisodes(character)

        console.log(character);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error:(err)=> {
        console.log("Error getCharacterById: ",err);
        this.$isError.set("No se ha encontrado el persoanje.");
      },
    })
  }
//
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


