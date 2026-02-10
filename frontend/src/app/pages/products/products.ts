import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories = ['All', 'CCTV', 'Vault', 'Alarm'];
  selectedCategory = 'All';

  isModalOpen = false;
  selectedBrochure = '';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        // ngZone.run is the "Hard Fix" for the refresh bug
        this.ngZone.run(() => {
          this.allProducts = [...data];
          this.filteredProducts = [...data];
          
          // Force UI Update
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error("Could not load Atlas data:", err)
    });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    if (cat === 'All') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(p => p.category === cat);
    }
    this.cdr.detectChanges();
  }

  openBrochure(url: string) {
    if (!url) return;
    this.selectedBrochure = url;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBrochure = '';
    document.body.style.overflow = 'auto';
    this.cdr.detectChanges();
  }
}