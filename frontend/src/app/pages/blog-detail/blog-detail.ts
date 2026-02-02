import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, Blog } from '../../services/blog';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetail implements OnInit {
  post: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.blogService.getPostById(id).subscribe({
        next: (data) => {
          this.post = data;
          // After the interface update, this.post.imageAlt is now valid
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching blog detail:', err);
          this.post = null;
        }
      });
    }
  }
}