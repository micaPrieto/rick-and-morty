import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Character } from '../../characters/interfaces/character.interface';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { RESTEpisode } from '../interfaces/rest-episode.interface';
import { environment } from '../../../environments/environment';
import { Episode } from '../interfaces/episode.interface';

const API_URL = environment.episodesBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  characterEpisodes = new BehaviorSubject<Episode[]| null>(null);

  allEpisodes = new BehaviorSubject<Episode[]>([]);
  episodeQuery = new BehaviorSubject<Episode[]>([]);
  episodeSelected = new BehaviorSubject<Episode | null>(null);

  totalPages = new BehaviorSubject<number>(0);
  actualPage = new BehaviorSubject<number>(1);

  isSearching = new BehaviorSubject<boolean>(false);
  currentQuery = new BehaviorSubject<string>('');

  isError = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  //Función generica que recibe un array de URLs de episodios, y retorna un Observable<Episode[]>.
  getEpisodesByUrls(episodeUrls: string[]): Observable<Episode[]> {
    const episodes = episodeUrls.map(url => this.http.get<Episode>(url));
    return forkJoin(episodes);// Obtiene datos multiples
  }

  getCharacterEpisodes(character: Character) : void{
    if (character.episode?.length) {
      this.getEpisodesByUrls(character.episode)
        .subscribe({
          next: (episodes) => {
            this.characterEpisodes!.next(episodes);
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


   getAllEpisodes(page: number = 1): void{
      this.isSearching.next(false);
      this.isError.next(null);
      this.episodeSelected.next(null);

       this.http.get<RESTEpisode>(`${API_URL}/episode`,{
        params: {page}
        })
        .subscribe({
          next: (resp) =>{
            const episodes = resp.results;

            this.allEpisodes.next(episodes);
            this.totalPages.next(resp.info.pages);

             window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          error:(err)=> {
            console.log("Error getEpisodes: ",err);
            this.allEpisodes.next([]);
            this.isError.next("Ha ocurrido un error al cargar los datos");
          },
        })
    }

    searchEpisodes(query: string, page: number = 1): void
      {
        this.actualPage.next(page);
        this.isError.next(null);
        this.isSearching.next(true);

        query = query.toLowerCase();
        this.currentQuery.next(query);

          this.http.get<RESTEpisode>(`${API_URL}/episode`, {
           params: { name: query, page }
          })
          .subscribe({
            next: (resp) =>{
              this.totalPages.next(resp.info.pages);
              const episodes = resp.results;
              this.episodeQuery.next(episodes);

              console.log('Episodios encontrados: ',resp);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            error:(err)=> {
              console.log("Err:",err);
              this.episodeQuery.next([]);
              this.isError.next(`No se logró obtener episodios con el nombre: "${query}"`);
            },
          })
      }

      /*
      getEpisodeById(id: number): void {
         this.isError.next(null);
         this.isSearching.next(false);

        this.http.get<Character>(`${API_URL}/character/${id}`)
        .subscribe({
          next: (character) =>{
            this.characterSelected.next(character);
            this.episodesService.getCharacterEpisodes(character)

            console.log('Personaje encontrado: ',character);
          },
          error:(err)=> {
            console.log("Error getCharacterById: ",err);
            this.isError.next("No se ha encontrado el persoanje.");
          },
        })
      }
    */
      notSearching() {
        this.isSearching.next(false);
      }


}


