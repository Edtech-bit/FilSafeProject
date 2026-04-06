import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';
import { Router } from '@angular/router';

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
  'Vault Doors Model':  { include: 'Vault Door', exclude: 'Bank' },  
  'Safety Deposit Box': { include: 'Safety Deposit' },
  'Cash Safe - 4820':  { include: '4820', exclude: '2016'},
  'Cash Safe - 2016':   { include: '2016', exclude: '4820'}
};

  selectedCategory = 'All';
  selectedSubCategory = 'All';

  isModalOpen = false;
  selectedBrochure = '';
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
  this.productService.getProducts().subscribe({
    next: (data) => {
      this.ngZone.run(() => {
        this.allProducts = [...data];
        
        // ADD THIS LINE
        console.log('RAW PRODUCTS FROM API:', JSON.stringify(data.map(p => p.name)));
        
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

  // ADD THIS - log all products to see exact names
  console.log('All products:', this.allProducts.map(p => ({ name: p.name, category: p.category, subCategory: p.subCategory })));

  if (this.selectedCategory !== 'All') {
    temp = temp.filter(p => p.category === this.selectedCategory);
  }

  if (this.selectedCategory === 'Vault' && this.selectedSubCategory !== 'All') {
    const map = this.subCategoryNameMap[this.selectedSubCategory];
    
    // ADD THIS - log what's being filtered
    console.log('Selected sub:', this.selectedSubCategory);
    console.log('Map:', map);
    console.log('Temp before filter:', temp.map(p => p.name));

    temp = temp.filter(p => {
      const nameLower = p.name.toLowerCase();
      const matchesSubCategory = p.subCategory === this.selectedSubCategory;
      const matchesInclude = map && nameLower.includes(map.include.toLowerCase());
      const matchesExclude = map?.exclude && nameLower.includes(map.exclude.toLowerCase());
      
      // ADD THIS - log each product check
      console.log(`Product: "${p.name}" | include: ${matchesInclude} | exclude: ${matchesExclude}`);
      
      return matchesSubCategory || (matchesInclude && !matchesExclude);
    });
  }

  this.filteredProducts = temp;
  this.cdr.detectChanges();
}

  openBrochure(product: Product) {
    if (!product || !product.brochure) return;
    this.selectedProduct = product;
    this.selectedBrochure = product.brochure;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBrochure = '';
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
    this.cdr.detectChanges();
  }

  inquireProduct(productName: string) {
    this.closeModal();
    this.router.navigate(['/contact'], { queryParams: { subject: productName } });
  }
}