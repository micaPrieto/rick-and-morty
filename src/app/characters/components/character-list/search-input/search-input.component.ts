import { Component, inject, output } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {

  charactersService = inject(CharactersService)

  $characters = output<Character[]>();

  onSearch(query:string){
    this.charactersService.$actualPage.set(1);
    this.charactersService.searchCharacters(query)
    .subscribe({
      next: (characters) =>{
        this.charactersService.$isError.set(null);
        this.$characters.emit(characters);
        //this.$characters.set(characters);
      },
      error:(err)=> {
        console.log("Err:",err);
        //this.$characters.set([]);
        this.$characters.emit([]);
        this.charactersService.$isError.set(err);
      },
    })
  }

}
