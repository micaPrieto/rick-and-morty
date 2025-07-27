import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Episode } from '../../../interfaces/episode.interface';

@Component({
  selector: 'app-episode-card',
  imports: [RouterLink,RouterModule],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.css'
})
export class EpisodeCardComponent {
   @Input() episode!: Episode;

}
