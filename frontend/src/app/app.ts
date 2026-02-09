import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

// Declare gtag as a global function for TypeScript
declare var gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
})

export class App implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // replace G-XXXXXXXXXX with your Measurement ID
      gtag('config', 'G-XXXXXXXXXX', {
        page_path: event.urlAfterRedirects
      });
    });
  }

  onActivate() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Uses 'instant' to prevent seeing the scroll happen
    });
  }
}