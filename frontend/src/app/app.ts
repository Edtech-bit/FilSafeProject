import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // Added NgOptimizedImage
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
    NgOptimizedImage // Added to enable optimized image loading for your logo
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private router = inject(Router);

  isMenuOpen: boolean = false;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // replace G-XXXXXXXXXX with your Measurement ID
      if (typeof gtag === 'function') {
        gtag('config', 'G-XXXXXXXXXX', {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  onActivate() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }
}