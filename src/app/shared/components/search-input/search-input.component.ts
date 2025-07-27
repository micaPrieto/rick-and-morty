import { Component, inject, Input, output } from '@angular/core';
import { CharactersService } from '../../../characters/services/characters-service';
import { Router } from '@angular/router';
import { EpisodesService } from '../../../episodes/services/episodes-service';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {

  @Input() dad!: string;


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

  clear() {
    // Fuerza la recarga navegando a una URL ficticia y luego vuelve a /characters

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
