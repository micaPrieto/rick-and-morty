import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EpisodesService } from '../../../services/episodes-service';
import { Episode } from '../../../interfaces/episode.interface';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-episode-info',
  imports: [CommonModule],
  templateUrl: './episode-info.component.html',
  styleUrl: './episode-info.component.css'
})
export class EpisodeInfoComponent {

   @Input() episodeSelected: Episode | null = null;

    isFavorite = false;

  constructor(private userService: UserService) {}

  ngOnChanges(): void {
    if (!this.episodeSelected) return;

    const episodes = this.userService.favoritesEpisodes.getValue();
    this.isFavorite = episodes?.some(e => e.id === this.episodeSelected!.id) ?? false;
  }

  toggleFavorite(): void {
    if (!this.episodeSelected) return;

    const id = this.episodeSelected.id.toString();

    if (this.isFavorite) {
      this.userService.removeFavoriteEpisode(id).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.userService.addFavoriteEpisode(id).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }

}
