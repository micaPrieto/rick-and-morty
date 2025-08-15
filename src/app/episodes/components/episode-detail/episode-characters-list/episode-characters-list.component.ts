import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../../../characters/interfaces/character.interface';
import { Subscription } from 'rxjs';
import { EpisodesService } from '../../../services/episodes-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommentFormComponent } from "../../../../comments/components/comment-form/comment-form.component";

@Component({
  selector: 'app-episode-characters-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './episode-characters-list.component.html'
})
export class EpisodeCharactersListComponent implements OnInit, OnDestroy{


  characters: Character[] | null = null;
  sub = new Subscription();

  showAll: boolean = false;
  initialDisplayCount: number = 5;

  constructor(
    private episodesService: EpisodesService
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.episodesService.episodeCharacters.subscribe((characters) => {
        this.characters = characters;
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Método para obtener los personajes a mostrar
  getDisplayedCharacters(): Character[] {
    if (!this.characters) return [];

    if (this.showAll || this.characters.length <= this.initialDisplayCount) {
      return this.characters;
    }

    return this.characters.slice(0, this.initialDisplayCount);
  }

  // Método para alternar entre mostrar todos o solo algunos
  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }


  //  characters : Character[] | null =  null;
  //  sub =new Subscription();

  //   constructor(
  //     private episodesService: EpisodesService
  //   ) {}

  //   ngOnInit(): void {

  //     this.sub.add(
  //       this.episodesService.episodeCharacters.subscribe((characters) => {
  //         this.characters = characters;
  //       })
  //     )
  //   }

  //   ngOnDestroy(): void  {
  //     this.sub.unsubscribe();
  //   }


}
