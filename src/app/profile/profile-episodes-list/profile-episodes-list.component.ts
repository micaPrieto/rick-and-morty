import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EpisodesService } from '../../episodes/services/episodes-service';
import { Episode } from '../../episodes/interfaces/episode.interface';
import { CharactersService } from '../../characters/services/characters-service';
import { UserService } from '../../auth/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-episodes-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-episodes-list.component.html'
})
export class ProfileEpisodesListComponent {

    favoritesEpisodes : Episode[] | null =  null;
    sub =new Subscription();

    constructor(
      private userService: UserService,

    ) {}

    ngOnInit(): void {

      this.sub.add(
        this.userService.favoritesEpisodes.subscribe((episodes) => {
          this.favoritesEpisodes = episodes;
        })
      )
    }

    ngOnDestroy(): void  {
      this.sub.unsubscribe();
    }


   removeFavorite(id: number) {
    this.userService.removeFavorite(id.toString()).subscribe({
      next: (updatedFavorites) => {
        this.favoritesEpisodes = this.favoritesEpisodes?.filter(e => e.id !== id) || null;
      },
      error: (err) => {
        console.error('Error al eliminar el episodio:', err);
      }
    });
  }

}
