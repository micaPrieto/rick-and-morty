import { Component, inject, output } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {

  constructor(
    private charactersService: CharactersService
  ) {}

  onSearch(query:string): void{
    this.charactersService.actualPage.next(1);

    this.charactersService.searchCharacters(query)
  }

}
