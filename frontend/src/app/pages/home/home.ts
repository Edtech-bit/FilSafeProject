import { Component, OnInit, ChangeDetectorRef, Inject, Renderer2 } from '@angular/core'; // Added Inject and Renderer2
import { CommonModule, DOCUMENT } from '@angular/common'; // Added DOCUMENT
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
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2, // Used to safely manipulate the DOM
    @Inject(DOCUMENT) private document: Document // Access the site's HTML document
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setSchemas(); // Call the schema setup
  }

  setSchemas() {
    // 1. Organization Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Filsafe",
      "url": "https://filsafe.shop",
      "logo": "https://filsafe.shop/FS_LOGO_BG.png"
    };

    // 2. Local Business Schema
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
    this.blogService.getPosts().subscribe({
      next: (data) => {
        console.log('Success! Blogs received:', data);
        this.blogs = data;
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