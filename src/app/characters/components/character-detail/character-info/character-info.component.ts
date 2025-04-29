import { Component, inject, OnInit } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-info',
  imports: [CommonModule],
  templateUrl: './character-info.component.html'
})
export class CharacterInfoComponent  implements OnInit{

  charactersService = inject(CharactersService);
  activatedRoute = inject(ActivatedRoute);

  characterSelected = this.charactersService.$characterSelected;


  ngOnInit(): void {
    this.getCharacterById();
  }


  getCharacterById()
  {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.charactersService.getCharacterById(+id)
        //console.log("Episodios del personaje actual:", this.$episodes);
      }
    });
  }

}
