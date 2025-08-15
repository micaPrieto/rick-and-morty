import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharactersService } from '../../../characters/services/characters-service';
import { FloatingBarComponent } from '../../../shared/components/floating-bar/floating-bar.component';
import { ProfileInfoComponent } from "../../components/profile-info/profile-info.component";
import { ProfileEpisodesListComponent } from '../../components/profile-episodes-list/profile-episodes-list.component';


@Component({
  selector: 'app-profile',
  imports: [FloatingBarComponent, ProfileInfoComponent, ProfileEpisodesListComponent],
  templateUrl: './user-profile-page.component.html',
})
export default class ProfileComponent {
    isError : any;

    sub =new Subscription()

    constructor(
      private charactersService: CharactersService
    ) {}

    ngOnInit(): void {

      this.sub.add(
        this.charactersService.isError.subscribe(err => {
          this.isError = err;
        })
      )
    }

    ngOnDestroy(): void  {
      this.sub.unsubscribe();
    }

}
