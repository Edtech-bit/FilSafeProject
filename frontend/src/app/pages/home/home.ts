import { Component, OnInit, ChangeDetectorRef, Inject, Renderer2 } from '@angular/core'; 
import { CommonModule, DOCUMENT } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router'; 
import { BlogService, Blog } from '../../services/blog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  // Properties used in home.html
  blogs: Blog[] = [];
  loadingBlogs: boolean = true; 

  constructor(
    private blogService: BlogService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2, 
    private router: Router,
    @Inject(DOCUMENT) private document: Document 
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setSchemas();
  }

  setSchemas() {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Filsafe",
      "url": "https://filsafe.shop",
      "logo": "https://filsafe.shop/FS_LOGO_BG.png"
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Filsafe",
      "image": "https://filsafe.com/public/FS_LOGO_BG.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Catleya Street, St. Peter Village, Camuning, Mexico, Pampanga",
        "addressLocality": "Angeles City",
        "addressRegion": "Pampanga",
        "postalCode": "2009",
        "addressCountry": "PH"
      },
      "telephone": "+63 920-932-6741"
    };

    this.insertSchema(orgSchema);
    this.insertSchema(localBusinessSchema);
  }

  private insertSchema(schema: any) {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, script);
  }

  loadData() {
    this.loadingBlogs = true; 
    this.blogService.getPosts().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loadingBlogs = false; 
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Data failed to load:', err);
        this.loadingBlogs = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Method to navigate with the global loader
  goToBlog(id: string | undefined) {
    if (!id) return;
    
    const loader = this.document.getElementById('app-loader');
    if (loader) {
      loader.classList.remove('hidden'); 
    }
    
    setTimeout(() => {
      this.router.navigate(['/blog', id]);
    }, 300);
  }

  scrollToServices() {
    const element = this.document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}