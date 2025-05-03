import { Component, inject, OnInit } from '@angular/core';
import { CharactersService } from '../../../characters/services/characters-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Character } from '../../../characters/interfaces/character.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-floating-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './floating-bar.component.html'
})
export class FloatingBarComponent  implements OnInit{

  actualCharacter : Character | null = null;

  private subscription!: Subscription;

  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {

    this.subscription = this.charactersService.characterSelected.subscribe((character) => {
      this.actualCharacter  = character;
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
