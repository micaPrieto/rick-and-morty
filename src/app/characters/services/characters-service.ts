import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCharacters } from '../interfaces/rest-characters.interface';
import { Character } from '../interfaces/character.interface';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, throwError } from 'rxjs';
import { EpisodesService } from '../../episodes/services/episodes-service';
import { CharacterMapper } from '../mapper/character.mapper';
import { environment } from '../../../environments/environment';
import { Episode } from '../../episodes/interfaces/episode.interface';


const API_URL = environment.charactersBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private http: HttpClient,
  ) {}

  //En RxJS, un BehaviorSubject<T>: Es un tipo especial de Observable<T> que mantiene el último valor emitido.
  // Podés suscribirte a él como a cualquier Observable
  characters = new BehaviorSubject<Character[]>([]);
  charactersQuery = new BehaviorSubject<Character[]>([]);
  characterSelected = new BehaviorSubject<Character | null>(null);

  characterEpisodes = new BehaviorSubject<Episode[]| null>(null);

  totalPages = new BehaviorSubject<number>(0);
  actualPage = new BehaviorSubject<number>(1);

  isSearching = new BehaviorSubject<boolean>(false);
  currentQuery = new BehaviorSubject<string>('');

  isError = new BehaviorSubject<string | null>(null);

  getCharacters(page: number = 1): void{
    this.isSearching.next(false);
    this.isError.next(null);
    this.characterSelected.next(null);

     this.http.get<RESTCharacters>(`${API_URL}/character`,{
      params: {page}
      })
      .subscribe({
        next: (resp) =>{
          const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);

          this.characters.next(characters);
          this.totalPages.next(resp.info.pages);

           window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error:(err)=> {
          console.log("Error getCharaters: ",err);
          this.characters.next([]);
          this.isError.next("Ha ocurrido un error al cargar los datos");
        },
      })
  }

  searchCharacters(query: string, page: number = 1): void
  {
    this.actualPage.next(page);
    this.isError.next(null);
    this.isSearching.next(true);

    query = query.toLowerCase();
    this.currentQuery.next(query);

      this.http.get<RESTCharacters>(`${API_URL}/character`, {
       params: { name: query, page }
      })
      .subscribe({
        next: (resp) =>{
          this.totalPages.next(resp.info.pages);
          const characters = CharacterMapper.mapApiItemToCharacterArray(resp.results);
          this.charactersQuery.next(characters);

          console.log('Personajes encontrados: ',resp);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error:(err)=> {
          console.log("Err:",err);
          this.charactersQuery.next([]);
          this.isError.next(`No se logró obtener personajes con el nombre: "${query}"`);
        },
      })
  }

  getCharacterById(id: number): void {
     this.isError.next(null);
     this.isSearching.next(false);

    this.http.get<Character>(`${API_URL}/character/${id}`)
    .subscribe({
      next: (character) =>{
        this.characterSelected.next(character);
        this.getEpisodesByCharacter(character)

        console.log('Personaje encontrado: ',character);
      },
      error:(err)=> {
        console.log("Error getCharacterById: ",err);
        this.isError.next("No se ha encontrado el persoanje.");
      },
    })
  }

  notSearching() {
    this.isSearching.next(false);
  }



     //?----------- Acceder a los episodios en los que sale el personaje -----------------

    //Función generica que recibe un array de URLs de episodios, y retorna un Observable<Episode[]>.
    getEpisodesByUrls(episodeUrls: string[]): Observable<Episode[]> {
      const episodes = episodeUrls.map(url => this.http.get<Episode>(url));
      return forkJoin(episodes);// Obtiene datos multiples
    }

    getEpisodesByCharacter(character: Character) : void{
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




}


