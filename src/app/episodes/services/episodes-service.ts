import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Character } from '../../characters/interfaces/character.interface';
import { forkJoin, Observable } from 'rxjs';
import { Episode } from '../interfaces/rest-episode.interface';

const API_URL = 'https://rickandmortyapi.com/api'

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) {}

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
            console.log("Error al acceder a los episodios");
          }
        });
    }
    else{
      console.log('No se ha podido acceder a los episodios');
    }
  }


}


