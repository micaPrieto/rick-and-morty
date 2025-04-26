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


  charactersFiltered: any;
  searchTerm: any;

  $totalPages = this.charactersService.$totalPages;
  $characters =this.charactersService.$characters;
  $page = signal(1);


  ngOnInit(): void {
    this.getCharacters(this.$page());
  }

  getCharacters(page: number) {
    this.$page.set(page);
    this.charactersService.getCharacters(page);
  }

  prevPage() {
    if (this.$page() > 1) {
      this.getCharacters(this.$page() - 1);
    }
  }

  nextPage() {
    console.log(1);
    if (this.$page() < this.$totalPages()) {
      this.getCharacters(this.$page() + 1);
      console.log(2);
    }
  }

  goToPage(p: number) {
    this.$page.set(p);
    this.getCharacters(p);
  }

  onSearch() {
    throw new Error('Method not implemented.');
    }


    // Calcula qué páginas mostrar en el paginador

  // Devuelve un array de páginas para mostrar alrededor de la página actual
   pagesToShow () {
    const totalPages = this.$totalPages();
    const visiblePages = 5; // Total de botones visibles
    const half = Math.floor(visiblePages / 2);

    let start = this.$page() - half;
    let end = this.$page() + half;

    // Ajuste si estoy al principio
    if (start < 1) {
      end += (1 - start);
      start = 1;
    }

    // Ajuste si estoy al final
    if (end > totalPages) {
      start -= (end - totalPages);
      end = totalPages;
    }

    // Evitar que start sea menor que 1 después de ajustar
    start = Math.max(start, 1);

    // Construyo el array de páginas
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

}
