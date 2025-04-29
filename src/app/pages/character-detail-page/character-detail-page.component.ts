import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters-service';
import { FloatingBarComponent } from "../../shared/floating-bar/floating-bar.component";
import { CommonModule } from '@angular/common';
import { Episode } from '../../interfaces/episodes/episode.interface';
import { EpisodesService } from '../../services/episodes-service';
import { Character } from '../../interfaces/characters/character.interface';

@Component({
  selector: 'app-character-detail-page',
  imports: [FloatingBarComponent, CommonModule],
  templateUrl: './character-detail-page.component.html',
  styleUrl: './character-detail-page.component.css'
})
export default class CharacterDetailPageComponent implements OnInit{

   charactersService = inject(CharactersService);
   episodesService = inject(EpisodesService)
   activatedRoute = inject(ActivatedRoute);

   characterSelected = this.charactersService.$characterSelected;

 $episodes = computed(() => this.episodesService.$episodes());

  ngOnInit(): void
  {
    this.getCharacterById();
  }


  getCharacterById()
  {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.charactersService.getCharacterById(+id)
        console.log("EPISODIOS:", this.$episodes);
      }
    });
  }



  /*
  getCharacterById()
  {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {


        this.charactersService.getCharacterById(+id)
        .subscribe({
          next: (character) =>{
           ;
            this.episodesService.getCharacterEpisodes(character)

            console.log(character);
          },
          error:(err)=> {
            console.log("Err:",err);
            this.$isError.set("No se ha encontrado el persoanje.");
          },
        })

      }
    });
  }
*/


  /*
   //SERVICE
      getCharacterById(id: number): void {
    this.isSearching.set(false);
    this.http.get<Character>(`${this.baseUrl}/character/${id}`)
    .subscribe({
      next: (character) =>{
        this.$characterSelected.set(character);
        this.episodesService.getCharacterEpisodes(character)

        console.log(character);
      },
      error:(err)=> {
        console.log("Err:",err);
        this.$isError.set("No se ha encontrado el persoanje.");
      },
    })
  }


  */


}
