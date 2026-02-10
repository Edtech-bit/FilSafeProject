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
    if (!this.newProduct.name || (!this.isEditingProduct && (!this.newProduct.image || !this.newProduct.brochure))) {
      alert("Please fill in the name and upload the required images.");
      return;
    }

    if (this.isEditingProduct && this.newProduct._id) {
      this.productsService.updateProduct(this.newProduct._id, this.newProduct).subscribe({
        next: () => {
          alert('Product Updated Successfully!');
          this.cancelProductEdit();
          this.loadProducts();
        },
        error: (err) => console.error("Product Update Error:", err)
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
    this.newProduct = { ...product }; // This ensures _id is included
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
    // Validation: Require title and content always.
    if (!this.newBlog.title || !this.newBlog.content) {
      alert('Please ensure the title and content are provided.');
      return;
    }

    // Logic for Updating
    if (this.isEditingBlog && this.newBlog._id) {
      console.log("Updating Blog ID:", this.newBlog._id);
      
      this.blogService.updatePost(this.newBlog._id, this.newBlog).subscribe({
        next: () => {
          alert('Blog Updated Successfully!');
          this.cancelBlogEdit();
          this.loadBlogs();
        },
        error: (err) => {
          console.error("Blog Update Error (404 usually means wrong ID in URL):", err);
          alert("Failed to update blog. Check server connection.");
        }
      });
    } 
    // Logic for Adding New
    else {
      if (!this.newBlog.image) {
        alert('Please upload an image for the new blog post.');
        return;
      }
      
      this.blogService.addPost(this.newBlog).subscribe({
        next: () => {
          alert('Blog Published!');
          this.resetBlogForm();
          this.loadBlogs();
        },
        error: (err) => console.error("Save Error:", err)
      });
    }
  }

  editBlog(blog: Blog) {
    this.isEditingBlog = true;
    // Critical: This copies the entire blog object including the hidden _id
    this.newBlog = { ...blog }; 
    console.log("Loaded Blog for Edit:", this.newBlog);
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
  
  resetBlogForm() { 
    this.newBlog = { title: '', shortDescription: '', content: '', image: '', imageAlt: '' }; 
    this.isEditingBlog = false;
  }
  
  resetProductForm() { 
    this.newProduct = { name: '', category: 'CCTV', image: '', brochure: '', imageAlt: '' }; 
    this.isEditingProduct = false;
  }
}