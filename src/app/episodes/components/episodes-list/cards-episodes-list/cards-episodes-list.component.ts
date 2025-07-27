import { Component, Input } from '@angular/core';
import { Episode } from '../../../interfaces/episode.interface';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { EpisodeCardComponent } from "../episode-card/episode-card.component";

@Component({
  selector: 'app-cards-episodes-list',
  imports: [PaginationComponent, EpisodeCardComponent],
  templateUrl: './cards-episodes-list.component.html',
  styleUrl: './cards-episodes-list.component.css'
})
export class CardsEpisodesListComponent {


   @Input()
  episodes: Episode[] = [];

  name: string = 'episode';

}
