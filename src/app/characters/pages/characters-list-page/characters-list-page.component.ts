import { Component, OnDestroy, OnInit} from '@angular/core';
import { CharactersService } from '../../services/characters-service';

import { FloatingBarComponent } from "../../../shared/components/floating-bar/floating-bar.component";
import { Character } from '../../interfaces/character.interface';
import { Subscription } from 'rxjs';
import { CardsListComponent } from "../../components/character-list/cards-list/cards-list.component";
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';


@Component({
  selector: 'app-characters-list-page',
  imports: [
    SearchInputComponent,
    FloatingBarComponent,
    CardsListComponent
],
  templateUrl: './characters-list-page.component.html'
})
export default class CharactersListPageComponent implements OnInit, OnDestroy {

  characters : Character[] = [];
  charactersQuery : Character[] = [];
  isError : any;
  isSearching: boolean = false;

  name:string = 'character';

  sub =new Subscription()


  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.subscriptions();
    this.charactersService.getCharacters(1);
  }


  subscriptions() {
    this.charactersService.isSearching.subscribe(s => this.isSearching = s),

      this.sub.add(
        this.charactersService.characters.subscribe((data) => {
          this.characters = data;
        })
      );

      this.sub.add(
        this.charactersService.charactersQuery.subscribe((data) => {
          this.charactersQuery = data;
        })
      );

      this.sub.add(
        this.charactersService.isError.subscribe(err => {
          this.isError = err;
        })
      );
  }

  ngOnDestroy(): void  {
    this.sub.unsubscribe();
  }

}
