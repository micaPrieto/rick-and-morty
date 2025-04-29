import { Component, computed, inject } from '@angular/core';
import { EpisodesService } from '../../../../episodes/services/episodes-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-episodes-list',
  imports: [CommonModule],
  templateUrl: './character-episodes-list.component.html'
})
export class CharacterEpisodesListComponent {

  episodesService = inject(EpisodesService)

  $episodes = computed(() => this.episodesService.$episodes());
}
