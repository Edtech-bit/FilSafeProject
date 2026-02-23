import { Component, inject, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgOptimizedImage, DOCUMENT } from '@angular/common'; 
import { filter } from 'rxjs/operators';

// Declare gtag as a global function for TypeScript
declare var gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    CommonModule,
    NgOptimizedImage 
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private router = inject(Router);
  
  // Property to manage mobile menu
  isMenuOpen: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (typeof gtag === 'function') {
        gtag('config', 'G-4BMDNHDJWM', {
          page_path: event.urlAfterRedirects
        });
      }

      this.hideGlobalLoader();
    });
  }

  private hideGlobalLoader() {
    const loader = this.document.getElementById('app-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 400);
    }
  }

  onActivate() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }

  // Helper for mobile menu (if used in app.html)
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}