import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  // Main Navigation Categories
  categories = ['All', 'CCTV', 'Vault', 'Alarm'];

  // Sub-Categories for your 5 Vault Models
  vaultSubCategories = ['Bank Vault Model', 'Vault Doors Model', 'Safety Deposit Box', 'Cash Safe - 4820', 'Cash Safe - 2016'];

private subCategoryNameMap: Record<string, { include: string; exclude?: string }> = {
  'Bank Vault Model':   { include: 'Bank Vault' },
  'Vault Doors Model':  { include: 'Vault Door', exclude: 'Bank' },  // ← excludes "Bank Vault Door"
  'Safety Deposit Box': { include: 'Safety Deposit' },
  'Cash Safes - 4820':  { include: '4820' },
  'Cash Safe - 2016':   { include: '2016' }
};

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
          this.applyFilters();
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error("Error loading FilSafe products:", err)
    });
  }
  filterByCategory(cat: string) {
    if (this.selectedCategory === cat && cat !== 'All') {
      this.selectedCategory = 'All';
      this.selectedSubCategory = 'All';
    } else {
      this.selectedCategory = cat;
      this.selectedSubCategory = 'All';
    }
    this.applyFilters();
  }

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

    // Step 2: Filter by Sub-Category (Only if 'Vault' is active)
    // Update the filter inside applyFilters()
if (this.selectedCategory === 'Vault' && this.selectedSubCategory !== 'All') {
  const map = this.subCategoryNameMap[this.selectedSubCategory];
  temp = temp.filter(p => {
    const nameLower = p.name.toLowerCase();
    const matchesSubCategory = p.subCategory === this.selectedSubCategory;
    const matchesInclude = map && nameLower.includes(map.include.toLowerCase());
    const matchesExclude = map?.exclude && nameLower.includes(map.exclude.toLowerCase());
    return matchesSubCategory || (matchesInclude && !matchesExclude);
  });
}

    this.filteredProducts = temp;
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