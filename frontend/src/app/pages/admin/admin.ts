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

  // Edit States
  isEditingProduct = false;
  isEditingBlog = false;

  newBlog: Blog = { title: '', shortDescription: '', content: '', image: '', imageAlt: '' };
  newProduct: Product = { name: '', category: 'CCTV', image: '', brochure: '', imageAlt: '' };

  constructor(
    private blogService: BlogService,
    private productsService: ProductService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone 
  ) {}

  ngOnInit(): void {
    setTimeout(() => { this.loadInitialData(); }, 300);
  }

  loadInitialData() {
    this.loadBlogs();
    this.loadProducts();
  }

  switchTab(tab: 'blog' | 'product') {
    this.currentTab = tab;
    this.cdr.detectChanges();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.products = [...data]; 
          this.cdr.detectChanges();
        });
      }
    });
  }

  loadBlogs() {
    this.blogService.getPosts().subscribe(data => {
      this.blogs = [...data];
      this.cdr.detectChanges();
    });
  }

  // --- PRODUCT ACTIONS ---
  onProductSubmit() {
    if (this.isEditingProduct) {
      this.productsService.updateProduct(this.newProduct._id!, this.newProduct).subscribe(() => {
        alert('Product Updated!');
        this.cancelProductEdit();
        this.loadProducts();
      });
    } else {
      this.productsService.addProduct(this.newProduct).subscribe(() => {
        alert('Product Added!');
        this.resetProductForm();
        this.loadProducts();
      });
    }
  }

  editProduct(product: Product) {
    this.isEditingProduct = true;
    this.newProduct = { ...product }; // Copy data to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelProductEdit() {
    this.isEditingProduct = false;
    this.resetProductForm();
  }

  onDeleteProduct(id: string | undefined) {
    if (id && confirm('Delete this product?')) {
      this.productsService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  // --- BLOG ACTIONS ---
  onBlogSubmit() {
    if (this.isEditingBlog) {
      this.blogService.updatePost(this.newBlog._id!, this.newBlog).subscribe(() => {
        alert('Blog Updated!');
        this.cancelBlogEdit();
        this.loadBlogs();
      });
    } else {
      this.blogService.addPost(this.newBlog).subscribe(() => {
        alert('Blog Published!');
        this.resetBlogForm();
        this.loadBlogs();
      });
    }
  }

  editBlog(blog: Blog) {
    this.isEditingBlog = true;
    this.newBlog = { ...blog };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelBlogEdit() {
    this.isEditingBlog = false;
    this.resetBlogForm();
  }

  onDeleteBlog(id: string | undefined) {
    if (id && confirm('Delete post?')) {
      this.blogService.deletePost(id).subscribe(() => this.loadBlogs());
    }
  }

  // File Processing
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

  closePopup() { this.isModalOpen = false; this.cdr.detectChanges(); }
  resetBlogForm() { this.newBlog = { title: '', shortDescription: '', content: '', image: '', imageAlt: '' }; }
  resetProductForm() { this.newProduct = { name: '', category: 'CCTV', image: '', brochure: '', imageAlt: '' }; }
}