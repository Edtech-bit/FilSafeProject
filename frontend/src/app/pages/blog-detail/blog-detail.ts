import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject, Renderer2 } from '@angular/core'; // Added Inject and Renderer2
import { CommonModule, DOCUMENT } from '@angular/common'; // Added DOCUMENT
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, Blog } from '../../services/blog';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css',
  encapsulation: ViewEncapsulation.None
})
export class BlogDetail implements OnInit {
  post: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2, // Injected
    @Inject(DOCUMENT) private document: Document // Injected
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.blogService.getPostById(id).subscribe({
          next: (data) => {
            this.post = data;

            if (this.post && this.post.image) {
              // Your existing LCP Fix
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = this.post.image;
              link.fetchPriority = 'high';
              document.head.appendChild(link);

              // NEW: Part 5 Article Schema
              this.setArticleSchema(this.post);
            }
            
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

  // Implementation of Article Schema
  private setArticleSchema(blog: Blog) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blog.title,
      "image": blog.image,
      "author": {
        "@type": "Organization",
        "name": "Filsafe"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Filsafe",
        "logo": {
          "@type": "ImageObject",
          "url": "https://filsafe.shop/public/FS_LOGO_BG.png" // Update this URL
        }
      },
      "datePublished": new Date().toISOString(), // Or blog.date if available
      "description": `${blog.title} - Read the latest updates from Filsafe.`
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(articleSchema);
    this.renderer.appendChild(this.document.head, script);
  }
}