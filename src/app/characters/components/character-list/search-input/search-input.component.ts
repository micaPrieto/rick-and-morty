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
        this.$characters.emit(characters);
          // Desplazar automáticamente al inicio de la página
          window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error:(err)=> {
        console.log("Err:",err);
        this.$characters.emit([]);
        this.charactersService.$isError.set(err);
      },
    })
  }

}
