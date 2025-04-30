import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CharactersService } from '../../../characters/services/characters-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isCharactersRoute = false;

  router = inject(Router);
  charactersService = inject(CharactersService);


  goToCharacters() {
    // Limpiar si hay un error antes de navegar
    this.charactersService.$isError.set(null);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/characters']);
    });
  }

}


