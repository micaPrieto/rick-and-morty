import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CharactersService } from '../../../characters/services/characters-service';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

   isCharactersRoute = false;
    user: User | null = null;

  constructor(
    private router: Router,
    public userService: UserService
    ){}


  ngOnInit(): void {
    this.user = this.userService.user();
    console.log('Usuario logueado:', this.user);

    // Auto-cerrar navbar cuando cambia la ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeNavbar();
      }
    });
  }

    @ViewChild('navbarToggler') navbarToggler!: ElementRef;


  //Cierra el navbar en dispositivos móviles
  closeNavbar(): void {
    // Solo ejecutar en dispositivos móviles
    if (window.innerWidth < 992) {
      const navbarCollapse = document.getElementById('mainNavbarMenu');
      const toggler = this.navbarToggler?.nativeElement;

      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Usar Bootstrap's collapse API para cerrar suavemente
        const bsCollapse = new (window as any).bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();

        // Actualizar el estado del botón toggler
        if (toggler) {
          toggler.classList.add('collapsed');
          toggler.setAttribute('aria-expanded', 'false');
        }
      }
    }
  }

  //Maneja el logout y cierra el navbar
  logout(): void {
    this.closeNavbar();
    this.userService.logOut();
    // Si necesitas hacer redirect adicional:
    // this.router.navigate(['/auth/login']);
  }

  // Método para manejar clicks fuera del navbar (opcional)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.getElementById('mainNavbarMenu');

    // Si se hace click fuera del navbar y está abierto, cerrarlo
    if (navbar && navbarCollapse &&
        !navbar.contains(target) &&
        navbarCollapse.classList.contains('show')) {
      this.closeNavbar();
    }
  }



}


