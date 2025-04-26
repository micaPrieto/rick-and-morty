import { Component, inject, input, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { CharactersService } from '../../services/characters-service';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-cards-list',
  imports: [CardComponent, CommonModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})
export class CardsListComponent implements OnInit {
  ngOnInit(): void {
    this.charactersService.getCharacters();
  }
  charactersFiltered: any;
  searchTerm: any;
  totalPages: any;
  page: any;

  charactersService = inject(CharactersService)

  $characters =this.charactersService.$characters;

  //;



  nextPage() {
  throw new Error('Method not implemented.');
  }
  goToPage(arg0: number) {
  throw new Error('Method not implemented.');
  }

  prevPage() {
  throw new Error('Method not implemented.');
  }

  onSearch() {
  throw new Error('Method not implemented.');
  }

}
