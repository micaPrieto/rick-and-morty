import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardsListComponent } from "../../components/cards-list/cards-list.component";

@Component({
  selector: 'app-characters-page',
  imports: [RouterOutlet, CardsListComponent],
  templateUrl: './characters-page.component.html',
  styleUrl: './characters-page.component.css'
})
export default class CharactersPageComponent {

}
