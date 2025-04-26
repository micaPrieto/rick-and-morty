import { Component, inject, signal } from '@angular/core';
import { CharactersService } from '../../services/characters-service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  charactersService = inject(CharactersService)

  $totalPages = this.charactersService.$totalPages;
  $page = signal(1);


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
