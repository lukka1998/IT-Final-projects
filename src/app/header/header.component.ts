import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  icon = faTruck;
  isScrolled: boolean = false;
  burger = faBars;
  isBurgerActive: boolean = false;

  constructor(private router: Router) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (offset > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  toggleBurger(): void {
    this.isBurgerActive = !this.isBurgerActive;
  }

  closeBurgerMenu(): void {
    this.isBurgerActive = false;
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToBusket(): void {
    this.router.navigate(['/busket']);
  }
  headerTitle: string = 'Fast And Efficient, Online Ordering You Must Try.';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setHeaderTitle(event.url);
      }
    });
  }

  setHeaderTitle(url: string): void {
    switch (url) {
      case '/':
        this.headerTitle = 'Fast And Efficient, Online Ordering You Must Try.';
        break;
      case '/busket':
        this.headerTitle = 'My Cart';
        break;
      default:
        this.headerTitle = 'Fast And Efficient, Online Ordering You Must Try.';
        break;
    }
  }
}
