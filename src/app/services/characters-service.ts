import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-item';
import { Character } from '../interfaces/character.interface';
import { CharacterMapper } from '../mapper/character.mapper';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'https://rickandmortyapi.com/api';

  $characters = signal<Character[]>([]);
  $totalPages = signal(0);

  isSearching = signal(false);
  currentQuery = signal('');

  $actualPage = signal(1);


  getCharacters(page: number = 1): void
  {
      this.isSearching.set(false);
     this.http.get<ApiResponse>(`${ this.baseUrl}/character`,   {
      params: {page}
      }).subscribe( (resp) =>{
        const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);

        this.$characters.set(characters);
        this.$totalPages.set(resp.info.pages);

      })
  }



  searchCharacters(query: string, page: number = 1): Observable<Character[]> {
    this.isSearching.set(true);
    this.currentQuery.set(query);

    return this.http.get<ApiResponse>(`${this.baseUrl}/character`, {
      params: { name: query, page }
    }).pipe(
      map((resp) => {
        this.$totalPages.set(resp.info.pages);
        return CharacterMapper.mapApiItemToCharacterArray(resp.results);
      })
    );
  }

  /*
  searchCharacters(query:string, page: number = 1): Observable<Character[]>
    {
      this.isSearching.set(true);
      this.currentQuery.set(query);

      return this.http.get<ApiResponse>(`${ this.baseUrl}/character`,
        {
        params: {
          name: query,
          page: page,
          }
        })
        .pipe(
          map((resp) => {
            // Guardamos la cantidad de páginas
            this.$totalPages.set(resp.info.pages);
            return resp.results;
          }),
          map((resp) => CharacterMapper.mapApiItemToCharacterArray(resp)),
        )
    }
*/

}
