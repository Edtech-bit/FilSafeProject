import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'] // Fixed: should be styleUrls
})
export class Products implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  
  
  // Main Navigation Categories
  categories = ['All', 'CCTV', 'Vault', 'Alarm'];
  
  // Sub-Categories for your 5 Vault Models
  vaultSubCategories = ['Bank Vault Model', 'Vault Doors Model', 'Safety Deposit Box', 'Cash Safes - 4820', 'Cash Safe - 2016'];

  selectedCategory = 'All';
  selectedSubCategory = 'All';

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
        this.ngZone.run(() => {
          this.allProducts = [...data];
          this.applyFilters(); // Apply initial filter
          
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error("Error loading FilSafe products:", err)
    });
  }

  /**
   * Called when clicking main categories (All, CCTV, Vault, Alarm)
   */
  filterByCategory(cat: string) {
  // If the user clicks the same category that's already open, "toggle" it closed
  if (this.selectedCategory === cat && cat !== 'All') {
    this.selectedCategory = 'All';
    this.selectedSubCategory = 'All';
  } else {
    // Otherwise, open the new category
    this.selectedCategory = cat;
    this.selectedSubCategory = 'All';
  }
  
  this.applyFilters();
}

  /**
   * Called when clicking Vault sub-categories (Vault Doors, Cash Safes, etc.)
   */
  filterBySubCategory(sub: string) {
    this.selectedSubCategory = sub;
    this.applyFilters();
  }

  /**
   * Centralized filtering logic
   */
  applyFilters() {
    let temp = [...this.allProducts];

    // Step 1: Filter by Main Category
    if (this.selectedCategory !== 'All') {
      temp = temp.filter(p => p.category === this.selectedCategory);
    }

    // Step 2: Filter by Sub-Category (Only if "Vault" is active)
    if (this.selectedCategory === 'Vault' && this.selectedSubCategory !== 'All') {
      // Ensure Product interface has subCategory
      temp = temp.filter(p => p.subCategory === this.selectedSubCategory);
    }

    this.filteredProducts = temp;
    
    // Manually trigger change detection for standard UI updates
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