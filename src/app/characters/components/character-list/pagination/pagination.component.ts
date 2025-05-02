import { Component, inject } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  charactersService = inject(CharactersService)

  $LocaltotalPages = this.charactersService.$totalPages;
  $localActualPage = this.charactersService.$actualPage;


  getCharactersWithPage(page: number) {

    this.charactersService.$actualPage.set(page);

    if (this.charactersService.$isSearching()) //Si estoy en modo busqueda
    {
      const query = this.charactersService.$currentQuery();

      this.charactersService.searchCharacters(query, page);

    } else {
      this.charactersService.getCharacters(page);
    }

  }

  GoToprevPage() {
    if (this.$localActualPage() > 1) {
      this.getCharactersWithPage(this.$localActualPage() - 1);
    }
  }

  goToNextPage() {
    console.log(1);
    if (this.$localActualPage() < this.$LocaltotalPages()) {
      this.getCharactersWithPage(this.$localActualPage() + 1);
      console.log(2);
    }
  }

  goToPage(page: number) {
    this.charactersService.$actualPage.set(page);
    this.getCharactersWithPage(page);
  }


  // Devuelve un array de páginas para mostrar alrededor de la página actual
  pagesToShow () {
    const totalPages = this.$LocaltotalPages();
    const visiblePages = 5; // Total de botones visibles
    const half = Math.floor(visiblePages / 2);

    let start = this.$localActualPage() - half;
    let end = this.$localActualPage() + half;

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
