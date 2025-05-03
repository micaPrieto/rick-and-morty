import { Component, computed, inject, OnInit } from '@angular/core';
import { EpisodesService } from '../../../../episodes/services/episodes-service';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../../episodes/interfaces/rest-episode.interface';

@Component({
  selector: 'app-character-episodes-list',
  imports: [CommonModule],
  templateUrl: './character-episodes-list.component.html'
})
export class CharacterEpisodesListComponent implements OnInit {

  episodes : Episode[] | null =  null;


  constructor(
    private episodesService: EpisodesService
  ) {}

  ngOnInit(): void {
    this.episodesService.episodes.subscribe((episodes) => {
      this.episodes = episodes;
    });
  }

}
