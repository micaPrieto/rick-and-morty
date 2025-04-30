import { Component, inject, OnInit } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { translaterCharacterInfo } from '../../../pipes/translater-character-info.pipe';

@Component({
  selector: 'app-character-info',
  imports: [CommonModule, translaterCharacterInfo],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.css'
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
