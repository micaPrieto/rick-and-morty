import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { EpisodesService } from '../../../../episodes/services/episodes-service';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../../episodes/interfaces/episode.interface';
import { Subscription } from 'rxjs';
import { CharactersService } from '../../../services/characters-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-character-episodes-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './character-episodes-list.component.html'
})
export class CharacterEpisodesListComponent implements OnInit, OnDestroy {

  episodes : Episode[] | null =  null;
  sub =new Subscription();

  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {

    this.sub.add(
      this.charactersService.characterEpisodes.subscribe((episodes) => {
        this.episodes = episodes;
      })
    )
  }

  ngOnDestroy(): void  {
    this.sub.unsubscribe();
  }


}
