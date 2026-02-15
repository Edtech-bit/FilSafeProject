import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, Blog } from '../../services/blog';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css',
  encapsulation: ViewEncapsulation.None // This is required for rich text styles!
})
export class BlogDetail implements OnInit {
  post: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.blogService.getPostById(id).subscribe({
          next: (data) => {
            this.post = data;

            // --- ADD THIS TO FIX THE LCP DISCOVERY DELAY ---
            if (this.post && this.post.image) {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = this.post.image;
              link.fetchPriority = 'high'; // Prioritizes this over other assets
              document.head.appendChild(link);
            }
            // -----------------------------------------------

            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Fetch Error:', err);
            this.post = null;
          }
        });
      }
    });
  }
}