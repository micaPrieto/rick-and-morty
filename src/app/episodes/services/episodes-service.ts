import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Character } from '../../characters/interfaces/character.interface';
import { Episode } from '../interfaces/episode.interface';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) {}
  //

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


}


