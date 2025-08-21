import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Character } from '../../characters/interfaces/character.interface';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { RESTEpisode } from '../interfaces/rest-episode.interface';
import { environment } from '../../../environments/environment';
import { Episode } from '../interfaces/episode.interface';
import { CharactersService } from '../../characters/services/characters-service';

const API_URL = environment.episodesBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {


  episodeCharacters = new BehaviorSubject<Character[]| null>(null);

  allEpisodes = new BehaviorSubject<Episode[]>([]);
  episodeQuery = new BehaviorSubject<Episode[]>([]);
  episodeSelected = new BehaviorSubject<Episode | null>(null);


  totalPages = new BehaviorSubject<number>(0);
  actualPage = new BehaviorSubject<number>(1);

  isSearching = new BehaviorSubject<boolean>(false);
  currentQuery = new BehaviorSubject<string>(''); //! REVISAR

  isError = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
  ) {}


   getAllEpisodes(page: number = 1): void{
      this.isSearching.next(false);
      this.isError.next(null);
      this.episodeSelected.next(null);

       this.http.get<RESTEpisode>(`${API_URL}/episode`,{
        params: {page}
        })
        .subscribe({
          next: (resp) =>{
            console.log(resp);
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

    notSearching() {
      this.isSearching.next(false);
    }

    getEpisodeById(id: string): void {
        this.isError.next(null);
        this.isSearching.next(false);

      this.http.get<Episode>(`${API_URL}/episode/${id}`)
      .subscribe({
        next: (episode) =>{
          this.episodeSelected.next(episode);
          this.getCharactersByEpisode(episode)

          console.log('Episodio encontrado: ',episode);
        },
        error:(err)=> {
          console.log("Error getEpisodeById: ",err);
          this.isError.next("No se ha encontrado el episodio.");
        },
      })
    }

    getEpisodeById$(id: string): Observable<Episode> {
      return this.http.get<Episode>(`${API_URL}/episode/${id}`);
    }

    //?----------- Acceder a los personajes del episodio -----------------

    //Función generica que recibe un array de URLs de personajes y los retorna
    getCharactersByUrls(charactersUrls: string[]): Observable<Character[]> {
      const characters = charactersUrls.map(url => this.http.get<Character>(url));
      return forkJoin(characters);// Obtiene datos multiples
    }

    getCharactersByEpisode(episode: Episode) : void{
      if (episode.episode?.length) {
        this.getCharactersByUrls(episode.characters)
          .subscribe({
            next: (characters) => {
              this.episodeCharacters!.next(characters);
              console.log(`Personajes del episodio:`, characters);
            },
            error: (err) => {
              console.log("Error al acceder a los personajes");
            }
          });
      }
      else{
        console.log('No se ha podido acceder a los personajes');
      }
    }




}


