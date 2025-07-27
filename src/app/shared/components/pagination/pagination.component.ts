import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../../characters/services/characters-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EpisodesService } from '../../../episodes/services/episodes-service';

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

  @Input() dad!: string;

  private subscriptions: Subscription[] = [];

  constructor(
    private charactersService: CharactersService,
    private episodesService : EpisodesService
  ) {}
/*
  ngOnInit(): void {
    this.subscriptions.push(
      this.charactersService.totalPages.subscribe(p => this.totalPages = p),
      this.charactersService.actualPage.subscribe(p => this.actualPage = p),
      this.charactersService.isSearching.subscribe(s => this.isSearching = s),
      this.charactersService.currentQuery.subscribe(q => this.currentQuery = q)
    );
  }
    */

   ngOnInit(): void {
    if(this.dad === 'character'){
        this.subscriptions.push(
        this.charactersService.totalPages.subscribe(p => this.totalPages = p),
        this.charactersService.actualPage.subscribe(p => this.actualPage = p),
        this.charactersService.isSearching.subscribe(s => this.isSearching = s),
        this.charactersService.currentQuery.subscribe(q => this.currentQuery = q)
      );
    }else{
        this.subscriptions.push(
        this.episodesService.totalPages.subscribe(p => this.totalPages = p),
        this.episodesService.actualPage.subscribe(p => this.actualPage = p),
        this.episodesService.isSearching.subscribe(s => this.isSearching = s),
        this.episodesService.currentQuery.subscribe(q => this.currentQuery = q)
      );
    }
  }

 ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  getWithPage(page: number):void {

    if(this.dad === 'character'){
      this.charactersService.actualPage.next(page);

      if (this.isSearching) //Si estoy en modo busqueda
      {
        this.charactersService.searchCharacters(this.currentQuery, page);
      } else {
        this.charactersService.getCharacters(page);
      }
    }
    else{
      this.episodesService.actualPage.next(page);

      if (this.isSearching) //Si estoy en modo busqueda
      {
        this.episodesService.searchEpisodes(this.currentQuery, page);
      } else {
        this.episodesService.getAllEpisodes(page);
      }
    }


  }

  GoToprevPage():void {
    if (this.actualPage > 1) {
      this.getWithPage(this.actualPage - 1);
    }
  }

  goToNextPage() : void{
    if (this.actualPage < this.totalPages) {
      this.getWithPage(this.actualPage + 1);
    }
  }

  goToPage(page: number): void {
    this.getWithPage(page);
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
