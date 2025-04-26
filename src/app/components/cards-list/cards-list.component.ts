import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { CharactersService } from '../../services/characters-service';

@Component({
  selector: 'app-cards-list',
  imports: [CardComponent, CommonModule],
  templateUrl: './cards-list.component.html'
})
export class CardsListComponent implements OnInit {

  charactersService = inject(CharactersService)

  $characters =this.charactersService.$characters;

  charactersFiltered: any;
  searchTerm: any;


  ngOnInit(): void {
    this.charactersService.getCharacters(1);
  }

  onSearch(query:string){
    this.charactersService.$actualPage.set(1);
    this.charactersService.searchCharacters(query)
    .subscribe(resp => {
      this.$characters.set(resp);
    })
  }
}
