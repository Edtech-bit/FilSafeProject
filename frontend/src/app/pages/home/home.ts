import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, Blog } from '../../services/blog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  blogs: Blog[] = [];

  constructor(
    private blogService: BlogService,
    private cdr: ChangeDetectorRef // Inject the detector
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.blogService.getPosts().subscribe({
      next: (data) => {
        console.log('Success! Blogs received:', data);
        this.blogs = data;
        
        // THIS IS THE FIX:
        // This forces Angular to redraw the HTML immediately 
        // even if it thinks nothing has changed.
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Data failed to load on refresh:', err);
      }
    });
  }

  scrollToServices() {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}