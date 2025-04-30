import { Component, inject } from '@angular/core';
import { Character } from '../../../characters/interfaces/character.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {


}
