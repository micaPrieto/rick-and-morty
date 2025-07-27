import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EpisodesService } from '../../episodes/services/episodes-service';
import { Episode } from '../../episodes/interfaces/episode.interface';

@Component({
  selector: 'app-profile-episodes-list',
  imports: [CommonModule],
  templateUrl: './profile-episodes-list.component.html'
})
export class ProfileEpisodesListComponent {

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
