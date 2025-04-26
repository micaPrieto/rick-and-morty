import { Component} from '@angular/core';
import { CardsListComponent } from "../../components/cards-list/cards-list.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';


@Component({
  selector: 'app-characters-page',
  imports: [ CardsListComponent,PaginationComponent],
  templateUrl: './characters-page.component.html'
})
export default class CharactersPageComponent {



}
