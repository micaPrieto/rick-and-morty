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
  $actualPage = this.charactersService.$actualPage;


  getCharactersLocal(page: number) {
    this.charactersService.$actualPage.set(page);
    //this.charactersService.getCharacters(page);
    if (this.charactersService.isSearching()) //Si estoy en modo busqueda
    {
      const query = this.charactersService.currentQuery(); //guardo el nombre buscado

      this.charactersService.searchCharacters(query, page)
        .subscribe((characters) => {
          this.charactersService.$characters.set(characters);
          console.log('PERSONAJES SIGUIENTE PAGINA:', this.charactersService.$characters());
        });
    } else {
      this.charactersService.getCharacters(page);
    }

  }

  prevPage() {
    if (this.$actualPage() > 1) {
      this.getCharactersLocal(this.$actualPage() - 1);
    }
  }

  nextPage() {
    console.log(1);
    if (this.$actualPage() < this.$totalPages()) {
      this.getCharactersLocal(this.$actualPage() + 1);
      console.log(2);
    }
  }

  goToPage(page: number) {
    this.charactersService.$actualPage.set(page);
    this.getCharactersLocal(page);
  }



  // Devuelve un array de páginas para mostrar alrededor de la página actual
  pagesToShow () {
    const totalPages = this.$totalPages();
    const visiblePages = 5; // Total de botones visibles
    const half = Math.floor(visiblePages / 2);

    let start = this.$actualPage() - half;
    let end = this.$actualPage() + half;

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
