import { Component, inject, Input, output } from '@angular/core';
import { CharactersService } from '../../../characters/services/characters-service';
import { Router } from '@angular/router';
import { EpisodesService } from '../../../episodes/services/episodes-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {

  @Input() dad!: string;
  searchText: string = '';

  constructor(
    private charactersService: CharactersService,
    private episodesService : EpisodesService,
    private router : Router
  ) {}

  onSearch(query:string): void{
    if(this.dad === 'character'){
      this.charactersService.searchCharacters(query)
    }
    else{
      this.episodesService.searchEpisodes(query)
    }
  }

  clearInput(): void {
    this.searchText = '';
    const input = document.getElementById('searchInput') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }

  clear() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      if(this.dad === 'character'){
        this.router.navigate(['/characters']);
      }
      else{
        this.router.navigate(['/episodes']);
      }
    });
  }
}
