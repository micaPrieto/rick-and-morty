import { Component, inject, Input } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() character!: Character;

  router = inject(Router);

  irADetalles(id:number)
  {
    this.router.navigate([`characters/${id}`]);
    console.log('entre');
  }


}
