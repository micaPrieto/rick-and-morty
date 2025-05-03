import { Component, inject } from '@angular/core';
import { FloatingBarComponent } from "../../../shared/components/floating-bar/floating-bar.component";
import { CharacterEpisodesListComponent } from "../../components/character-detail/character-episodes-list/character-episodes-list.component";
import { CharactersService } from '../../services/characters-service';
import { CharacterInfoComponent } from "../../components/character-detail/character-info/character-info.component";


@Component({
  selector: 'app-character-detail-page',
  imports: [FloatingBarComponent, CharacterEpisodesListComponent, CharacterInfoComponent],
  templateUrl: './character-detail-page.component.html'
})
export default class CharacterDetailPageComponent{

  isError : any;

  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.charactersService.isError.subscribe(err => {
      this.isError = err;
    });
  }
}
