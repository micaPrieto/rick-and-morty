import { Component } from '@angular/core';
import { Episode } from '../../interfaces/episode.interface';
import { Subscription } from 'rxjs';
import { EpisodesService } from '../../services/episodes-service';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { FloatingBarComponent } from '../../../shared/components/floating-bar/floating-bar.component';
import { CardsEpisodesListComponent } from '../../components/episodes-list/cards-episodes-list/cards-episodes-list.component';

@Component({
  selector: 'app-episodes-list-page',
  imports: [SearchInputComponent,FloatingBarComponent,CardsEpisodesListComponent],
  templateUrl: './episodes-list-page.component.html'
})
export default class  EpisodesListPageComponent {


    episodes : Episode[] = [];
    episodesQuery : Episode[] = [];
    isError : any;
    isSearching: boolean = false;

    name: string = 'episode';

    sub =new Subscription()


    constructor(
      private episodesService: EpisodesService
    ) {}

    ngOnInit(): void {
      this.subscriptions();
      this.episodesService.getAllEpisodes(1);
    }


    subscriptions() {
      this.episodesService.isSearching.subscribe(s => this.isSearching = s),

        this.sub.add(
          this.episodesService.allEpisodes.subscribe((data) => {
            this.episodes = data;
          })
        );

        this.sub.add(
          this.episodesService.episodeQuery.subscribe((data) => {
            this.episodesQuery = data;
          })
        );

        this.sub.add(
          this.episodesService.isError.subscribe(err => {
            this.isError = err;
          })
        );
    }

    ngOnDestroy(): void  {
      this.sub.unsubscribe();
    }

}
