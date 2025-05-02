import { Component, inject, output } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {

  charactersService = inject(CharactersService)

  onSearch(query:string){
    this.charactersService.$actualPage.set(1);

    this.charactersService.searchCharacters(query)

  }

}
