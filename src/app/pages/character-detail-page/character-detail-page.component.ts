import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CharactersService } from '../../services/characters-service';

@Component({
  selector: 'app-character-detail-page',
  imports: [],
  templateUrl: './character-detail-page.component.html'
})
export default class CharacterDetailPageComponent implements OnInit{

   charactersService = inject(CharactersService);
   activatedRoute = inject(ActivatedRoute);

  characterSelected = this.charactersService.$characterSelected;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.charactersService.getCharacterById(+id); // El "+" fuerza a number
      }
    });
  }

}
