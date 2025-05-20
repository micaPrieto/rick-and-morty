import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../../services/characters-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnDestroy {

  // $localtotalPages = this.charactersService.$totalPages;
  // $localActualPage = this.charactersService.$actualPage;

  totalPages = 0;
  actualPage = 1
  isSearching: boolean = false;
  currentQuery: string = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.charactersService.totalPages.subscribe(p => this.totalPages = p),
      this.charactersService.actualPage.subscribe(p => this.actualPage = p),
      this.charactersService.isSearching.subscribe(s => this.isSearching = s),
      this.charactersService.currentQuery.subscribe(q => this.currentQuery = q)
    );
  }

 ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  getCharactersWithPage(page: number):void {
    this.charactersService.actualPage.next(page);

    if (this.isSearching) //Si estoy en modo busqueda
    {
      this.charactersService.searchCharacters(this.currentQuery, page);
    } else {
      this.charactersService.getCharacters(page);
    }

  }

  GoToprevPage():void {
    if (this.actualPage > 1) {
      this.getCharactersWithPage(this.actualPage - 1);
    }
  }

  goToNextPage() : void{
    if (this.actualPage < this.totalPages) {
      this.getCharactersWithPage(this.actualPage + 1);
    }
  }

  goToPage(page: number): void {
    //??? this.charactersService.$actualPage.next(page);
    this.getCharactersWithPage(page);
  }


  // Devuelve un array de páginas para mostrar alrededor de la página actual
  get pagesToShow () : number[]{
    const totalPages = this.totalPages;
    const visiblePages = 5; // Total de botones visibles
    const half = Math.floor(visiblePages / 2);

    let start = this.actualPage - half;
    let end = this.actualPage + half;

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
