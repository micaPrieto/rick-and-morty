import { Component, inject, OnInit } from '@angular/core';
import { CharactersService } from '../../../characters/services/characters-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Character } from '../../../characters/interfaces/character.interface';
import { Subscription } from 'rxjs';
import { Episode } from '../../../episodes/interfaces/episode.interface';
import { EpisodesService } from '../../../episodes/services/episodes-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './floating-bar.component.html',
})
export class FloatingBarComponent implements OnInit {
  actualCharacter: Character | null = null;
  actualEpisode: Episode | null = null;

  private subscriptionCharacter!: Subscription;
  private subscriptionEpisode!: Subscription;

  constructor(
    private charactersService: CharactersService,
    private episodesService: EpisodesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptionCharacter =
      this.charactersService.characterSelected.subscribe((character) => {
        this.actualCharacter = character;
      });

    this.subscriptionEpisode = this.episodesService.episodeSelected.subscribe(
      (episode) => {
        this.actualEpisode = episode;
      }
    );
  }

  get isCharacterRoute(): boolean {
    return this.router.url.includes('/characters');
  }

  get isEpisodeRoute(): boolean {
    return this.router.url.includes('/episodes');
  }

  get isProfileRoute(): boolean {
    return this.router.url.includes('/profile');
  }

  ngOnDestroy(): void {
    this.subscriptionCharacter.unsubscribe();
    this.subscriptionEpisode.unsubscribe();
  }
}
