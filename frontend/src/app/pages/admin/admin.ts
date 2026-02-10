import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'; 
import { BlogService, Blog } from '../../services/blog';
import { ProductService, Product } from '../../services/product'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  blogs: Blog[] = [];
  products: Product[] = []; 
  currentTab: 'blog' | 'product' = 'product'; 
  
  isModalOpen = false;
  selectedBrochure = '';

  newBlog: Blog = { title: '', shortDescription: '', content: '', image: '', imageAlt: '' };
  newProduct: Product = { name: '', category: 'CCTV', image: '', brochure: '', imageAlt: '' };

  constructor(
    private blogService: BlogService,
    private productsService: ProductService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone 
  ) {}

  ngOnInit(): void {
    // We delay the very first load by 300ms to ensure the browser 
    // has finished rendering the CSS/HTML container
    setTimeout(() => {
      this.loadInitialData();
    }, 300);
  }

  loadInitialData() {
    this.loadBlogs();
    this.loadProducts();
  }

  switchTab(tab: 'blog' | 'product') {
    this.currentTab = tab;
    this.cdr.detectChanges();
  }

  // --- THE REFRESH FIX ---
  loadProducts() {
    console.log('Admin: Requesting all products from Service...');
    this.productsService.getProducts().subscribe({
      next: (data) => {
        // We use ngZone to force the browser to acknowledge the data arrival
        this.ngZone.run(() => {
          console.log('Admin: Data received from Atlas. Count:', data.length);
          
          // Force a brand new array reference
          this.products = [...data]; 
          
          // Force immediate UI check
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error("Admin: Atlas Error", err)
    });
  }

  loadBlogs() {
    this.blogService.getPosts().subscribe(data => {
      this.blogs = [...data];
      this.cdr.detectChanges();
    });
  }

  // --- ACTIONS ---
  onProductSubmit() {
    if (!this.newProduct.name || !this.newProduct.image || !this.newProduct.brochure) {
      alert("Please fill name and upload both images.");
      return;
    }
    this.productsService.addProduct(this.newProduct).subscribe(() => {
      alert('Success!');
      this.resetProductForm();
      this.loadProducts();
    });
  }

  onDeleteProduct(id: string | undefined) {
    if (id && confirm('Delete this product?')) {
      this.productsService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  onBlogSubmit() {
    this.blogService.addPost(this.newBlog).subscribe(() => {
      alert('Blog Published!');
      this.resetBlogForm();
      this.loadBlogs();
    });
  }

  onDeleteBlog(id: string | undefined) {
    if (id && confirm('Delete post?')) {
      this.blogService.deletePost(id).subscribe(() => this.loadBlogs());
    }
  }

  // Standard File Processing
  onFileSelected(event: any) { this.processFile(event, 'blog'); }
  onProductImageSelected(event: any) { this.processFile(event, 'pImg'); }
  onBrochureSelected(event: any) { this.processFile(event, 'broch'); }

  processFile(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'blog') this.newBlog.image = reader.result as string;
        if (type === 'pImg') this.newProduct.image = reader.result as string;
        if (type === 'broch') this.newProduct.brochure = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  openBrochurePopup(src: string) { 
    this.selectedBrochure = src; 
    this.isModalOpen = true; 
    this.cdr.detectChanges();
  }

  closePopup() { 
    this.isModalOpen = false; 
    this.cdr.detectChanges();
  }

  resetBlogForm() { this.newBlog = { title: '', shortDescription: '', content: '', image: '', imageAlt: '' }; }
  resetProductForm() { this.newProduct = { name: '', category: 'CCTV', image: '', brochure: '', imageAlt: '' }; }
}