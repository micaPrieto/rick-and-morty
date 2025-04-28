import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { CharactersService } from '../../services/characters-service';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-cards-list',
  imports: [CardComponent, CommonModule, PaginationComponent],
  templateUrl: './cards-list.component.html'
})
export class CardsListComponent implements OnInit {

  charactersService = inject(CharactersService)

  $characters =this.charactersService.$characters;

  charactersFiltered: any;
  searchTerm: any;
  $isError = signal<string|null>(null);


  ngOnInit(): void {
    this.charactersService.getCharacters(1);
  }

  onSearch(query:string){
    this.charactersService.$actualPage.set(1);
    this.charactersService.searchCharacters(query)
    .subscribe({
      next: (characters) =>{
        this.$characters.set(characters);
      },
      error:(err)=> {
        console.log("Err:",err);
        this.$characters.set([]);
        this.$isError.set(err);
      },
    })
  }

 /*
 //Version del chat para que no se rompa el flujo de ejecución. En el service, en vez del throw, retorno un array vacio.
  onSearchIA(query: string) {
    this.charactersService.$actualPage.set(1);
    this.charactersService.searchCharacters(query)
      .subscribe((characters) => {
        if (characters.length === 0) {
          this.$isError.set('No se encontraron personajes.');
        } else {
          this.$isError.set(null);
        }
        this.$characters.set(characters);
      });
  }
*/

}

