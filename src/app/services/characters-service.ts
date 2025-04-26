import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-item';
import { Character } from '../interfaces/character.interface';
import { CharacterMapper } from '../mapper/character.mapper';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'https://rickandmortyapi.com/api';


  $characters = signal<Character[]>([]);
  $charactersLoading = signal(true);
  $totalPages = signal(0);

  getCharacters(page: number = 1)
  {
     this.http.get<ApiResponse>(`${ this.baseUrl}/character`,   {
      params: {page}
      }).subscribe( (resp) =>{
        const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);

        this.$characters.set(characters);
        this.$charactersLoading.set(false);
        this.$totalPages.set(resp.info.pages);

        console.log({characters});
        console.log(resp);
      })
  }






/*
 //FORMA TRADICIONAL (La que aprendi en la facu)
  getCharacters2(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/character?page=${page}`);
  }

  getCharacterById2(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/character/${id}`);
  }
    */
}
