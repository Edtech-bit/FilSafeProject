import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  imports: [NgFor, NgIf, NgClass]
})
export class Products {
  categories = [
    {
      name: 'Vaults',
      products: [
        { name: 'Vault 1', img: '/Vault1.JPG', brochure: '/Vault1.pdf' },
        { name: 'Vault 2', img: '/Vault2.JPG', brochure: '/Vault2.pdf' },
      
      ]
    },
    {
      name: 'CCTV',
      products: [
        
      ]
    },
    {
      name: 'Alarms',
      products: [

      ]
    }
  ];

  showModal = false;
  selectedBrochure: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  openModal(brochure: string) {
    // Sanitize the URL so the iframe can load it
    this.selectedBrochure = this.sanitizer.bypassSecurityTrustResourceUrl(brochure);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBrochure = null;
  }

  scrollLeft(slider: HTMLDivElement) {
    slider.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight(slider: HTMLDivElement) {
    slider.scrollBy({ left: 250, behavior: 'smooth' });
  }
}