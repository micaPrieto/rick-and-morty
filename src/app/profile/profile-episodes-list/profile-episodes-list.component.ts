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

  showAll: boolean = false;
  initialDisplayCount: number = 7;



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

  // Obtener los episodios a mostrar
  getDisplayedEpisodes() {
    if (!this.favoritesEpisodes) return [];

    if (this.showAll || this.favoritesEpisodes.length <= this.initialDisplayCount) {
      return this.favoritesEpisodes;
    }

    return this.favoritesEpisodes.slice(0, this.initialDisplayCount);
  }

  // Alternar entre mostrar todos o solo algunos
  toggleShowAll() {
    this.showAll = !this.showAll;
  }

}

  //   favoritesEpisodes : Episode[] | null =  null;
  //   sub =new Subscription();

  //   constructor(
  //     private userService: UserService,

  //   ) {}

  //   ngOnInit(): void {

  //     this.sub.add(
  //       this.userService.favoritesEpisodes.subscribe((episodes) => {
  //         this.favoritesEpisodes = episodes;
  //       })
  //     )
  //   }

  //   ngOnDestroy(): void  {
  //     this.sub.unsubscribe();
  //   }


  //  removeFavorite(id: number) {
  //   this.userService.removeFavorite(id.toString()).subscribe({
  //     next: (updatedFavorites) => {
  //       this.favoritesEpisodes = this.favoritesEpisodes?.filter(e => e.id !== id) || null;
  //     },
  //     error: (err) => {
  //       console.error('Error al eliminar el episodio:', err);
  //     }
  //   });
  // }





