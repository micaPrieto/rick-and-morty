import { Component, inject, output } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {


  constructor(
    private charactersService: CharactersService,
    private router : Router
  ) {}

  onSearch(query:string): void{
    this.charactersService.searchCharacters(query)
  }

  clear() {
    // Fuerza la recarga navegando a una URL ficticia y luego vuelve a /characters
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/characters']);
    });
  }


}
