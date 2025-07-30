import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../../../characters/interfaces/character.interface';
import { Subscription } from 'rxjs';
import { EpisodesService } from '../../../services/episodes-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-episode-characters-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './episode-characters-list.component.html',
  styleUrl: './episode-characters-list.component.css'
})
export class EpisodeCharactersListComponent implements OnInit, OnDestroy{
//Muestro los personajes del episodio seleccionado

   characters : Character[] | null =  null;
    sub =new Subscription();

    constructor(
      private episodesService: EpisodesService
    ) {}

    ngOnInit(): void {

      this.sub.add(
        this.episodesService.episodeCharacters.subscribe((characters) => {
          this.characters = characters;
        })
      )
    }

    ngOnDestroy(): void  {
      this.sub.unsubscribe();
    }


}
