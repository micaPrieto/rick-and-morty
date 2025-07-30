import { Component, Input, OnInit, inject } from '@angular/core';
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
export class EpisodeCardComponent implements OnInit{
   @Input() episode!: Episode;

   isFavorite: boolean = false;

   constructor(
    private userService : UserService
   ){}

  ngOnInit(): void {
    // Se suscribe a los episodios favoritos para marcar si este está incluido
    this.userService.favoritesEpisodes.subscribe((episodes) => {
      this.isFavorite = episodes?.some(e => e.id === this.episode.id) ?? false;
    });
  }


   addToFavorite(id: number){
      if (this.isFavorite) return;

      this.userService.addFavorite(id.toString()).subscribe(() => {
        this.isFavorite = true;
      });
   }

}
