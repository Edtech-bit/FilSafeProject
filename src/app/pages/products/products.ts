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
        { name: 'Vault 1', img: '/Vault1.JPG', brochure: '/Vault1.pdf' },
        { name: 'Vault 2', img: '/Vault2.JPG', brochure: '/Vault2.pdf' },
        { name: 'Vault 1', img: '/Vault1.JPG', brochure: '/Vault1.pdf' },
        { name: 'Vault 2', img: '/Vault2.JPG', brochure: '/Vault2.pdf' },
        { name: 'Vault 1', img: '/Vault1.JPG', brochure: '/Vault1.pdf' },
        { name: 'Vault 2', img: '/Vault2.JPG', brochure: '/Vault2.pdf' },
        { name: 'Vault 3', img: '/Vault3.JPG', brochure: '/Vault3.pdf' }
      ]
    },
    {
      name: 'CCTV',
      products: [
        { name: 'CCTV 1', img: '/CCTV1.JPG', brochure: '/CCTV1.pdf' },
        { name: 'CCTV 2', img: '/CCTV2.JPG', brochure: '/CCTV2.pdf' },
        { name: 'CCTV 3', img: '/CCTV3.JPG', brochure: '/CCTV3.pdf' }
      ]
    },
    {
      name: 'Alarms',
      products: [
        { name: 'Alarm 1', img: '/Alarm1.JPG', brochure: '/Alarm1.pdf' },
        { name: 'Alarm 2', img: '/Alarm2.JPG', brochure: '/Alarm2.pdf' },
        { name: 'Alarm 3', img: '/Alarm3.JPG', brochure: '/Alarm3.pdf' }
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