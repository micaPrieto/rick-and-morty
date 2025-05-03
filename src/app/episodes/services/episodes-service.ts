import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Character } from '../../characters/interfaces/character.interface';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Episode } from '../interfaces/rest-episode.interface';

const API_URL = 'https://rickandmortyapi.com/api'

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  episodes = new BehaviorSubject<Episode[]| null>(null);

  constructor(private http: HttpClient) {}

  getEpisodes(episodeUrls: string[]): Observable<Episode[]> {
    const episodes = episodeUrls.map(url => this.http.get<Episode>(url));
    return forkJoin(episodes);
  }

  getCharacterEpisodes(character: Character) {
    if (character.episode?.length) {
      this.getEpisodes(character.episode)
        .subscribe({
          next: (episodes) => {
            this.episodes!.next(episodes);
            console.log(`Episodios del personaje:`, episodes);
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


