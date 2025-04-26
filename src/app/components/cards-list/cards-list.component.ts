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

  charactersFiltered: any;
  searchTerm: any;

  $characters =this.charactersService.$characters;

  ngOnInit(): void {
    this.charactersService.getCharacters(1);
  }

  onSearch() {
    throw new Error('Method not implemented.');
    }


}
