import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharactersService } from '../../../characters/services/characters-service';
import { EpisodesService } from '../../services/episodes-service';
import { FloatingBarComponent } from "../../../shared/components/floating-bar/floating-bar.component";
import { EpisodeInfoComponent } from "../../components/episode-detail/episode-info/episode-info.component";
import { EpisodeCharactersListComponent } from "../../components/episode-detail/episode-characters-list/episode-characters-list.component";

@Component({
  selector: 'app-episode-detail-page',
  imports: [FloatingBarComponent, EpisodeInfoComponent, EpisodeCharactersListComponent],
  templateUrl: './episode-detail-page.component.html'
})
export default class EpisodeDetailPageComponent implements OnInit, OnDestroy {

    isError : any;

    sub =new Subscription()

    constructor(
      private episodesService: EpisodesService
    ) {}

    ngOnInit(): void {

      this.sub.add(
        this.episodesService.isError.subscribe(err => {
          this.isError = err;
        })
      )
    }

    ngOnDestroy(): void  {
      this.sub.unsubscribe();
    }

}
