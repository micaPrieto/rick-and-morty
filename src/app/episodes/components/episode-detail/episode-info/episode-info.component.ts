import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EpisodesService } from '../../../services/episodes-service';
import { Episode } from '../../../interfaces/episode.interface';

@Component({
  selector: 'app-episode-info',
  imports: [CommonModule],
  templateUrl: './episode-info.component.html',
  styleUrl: './episode-info.component.css'
})
export class EpisodeInfoComponent implements OnInit,OnDestroy{


  episodeSelected : Episode | null = null;
  sub =new Subscription();

  constructor(
    private episodesService: EpisodesService,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCharacterById();

    this.sub.add(
      this.episodesService.episodeSelected.subscribe((episode) => {
      this.episodeSelected  = episode;
    }))
  }

  getCharacterById(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.episodesService.getEpisodeById(id)
      }
    });
  }

  ngOnDestroy(): void  {
    this.sub.unsubscribe();
  }

}
