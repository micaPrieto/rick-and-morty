import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Episode } from '../../../interfaces/episode.interface';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-episode-card',
  imports: [RouterLink,RouterModule, CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.css'
})
export class EpisodeCardComponent implements  OnChanges{
  @Input() episode!: Episode;
  isFavorite = false;

  constructor(private userService: UserService) {}

  ngOnChanges(): void {
    const episodes = this.userService.favoritesEpisodes.getValue();
    this.isFavorite = episodes?.some(e => e.id === this.episode.id) ?? false;
  }

  toggleFavorite(): void {
    const id = this.episode.id.toString();

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
