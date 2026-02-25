import { Component } from '@angular/core';
import { NgOptimizedImage, NgFor } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage, NgFor, RouterLink], // Added NgFor here to fix the error
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  images: string[] = [
    'workers.jpg', 
    'filsafeguy.jpg' ,
    'filsafeguy2.jpg'
  ];
  
  currentIndex: number = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}