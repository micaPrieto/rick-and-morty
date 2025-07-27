import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { EpisodesService } from '../../../../episodes/services/episodes-service';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../../episodes/interfaces/episode.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-character-episodes-list',
  imports: [CommonModule],
  templateUrl: './character-episodes-list.component.html'
})
export class CharacterEpisodesListComponent implements OnInit, OnDestroy {

  episodes : Episode[] | null =  null;
  sub =new Subscription();

  constructor(
    private episodesService: EpisodesService
  ) {}

  ngOnInit(): void {

    this.sub.add(
      this.episodesService.characterEpisodes.subscribe((episodes) => {
        this.episodes = episodes;
      })
    )
  }

  ngOnDestroy(): void  {
    this.sub.unsubscribe();
  }


}
