import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // 1. Must import this for [class] bindings
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
    CommonModule // 2. Must include this in your imports array
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private router = inject(Router);

  // 3. Declare the property inside the class
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