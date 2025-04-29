import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RESTCharacters } from '../interfaces/characters/rest-characters.interface';
import { Character } from '../interfaces/characters/character.interface';
import { CharacterMapper } from '../mapper/character.mapper';
import { RESTEpisode } from '../interfaces/episodes/rest-episode.interface';
import { Episode } from '../interfaces/episodes/episode.interface';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EpisodesService {


  constructor(private http: HttpClient) {}

  private baseUrl = 'https://rickandmortyapi.com/api';

  $episodes= signal<Episode[] | null>(null);



  getEpisodes(episodeUrls: string[]): Observable<Episode[]> {
    const episodes = episodeUrls.map(url => this.http.get<Episode>(url));
    return forkJoin(episodes);
  }

  getCharacterEpisodes(character: Character) {

    if (character.episode?.length) {
      this.getEpisodes(character.episode)
        .subscribe({
          next: (episodes) => {
            this.$episodes!.set(episodes);
            console.log(episodes);
          },
          error: (err) => {
            console.log("Error:", err);
          }
        });
    }
    else{
      console.log('No se ha podido acceder a los episodios');
    }
  }

/*
  getEpisodesById(ids: number[]): void {
    this.isSearching.set(false);
    this.http.get<Episode>(`${this.baseUrl}/character/${ids}`)
    .subscribe({
      next: (resp) =>{
        this.$episodeSelect.set(resp);
        console.log(resp);
      },
      error:(err)=> {
        console.log("Err:",err);
        this.$isError.set("No se ha encontrado el persoanje.");
      },
    })
  }
*/


}


