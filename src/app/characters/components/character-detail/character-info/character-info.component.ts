import { Component, inject, OnInit, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { translaterCharacterInfo } from '../../../pipes/translater-character-info.pipe';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-character-info',
  imports: [CommonModule, translaterCharacterInfo],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.css'
})

export class CharacterInfoComponent  implements OnInit{

  characterSelected : Character | null = null;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCharacterById();

    this.charactersService.characterSelected.subscribe((character) => {
      this.characterSelected  = character;
    });

  }

  getCharacterById() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.charactersService.getCharacterById(+id)
      }
    });
  }


}
