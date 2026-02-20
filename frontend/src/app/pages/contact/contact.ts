import { Component, OnInit, Inject, Renderer2 } from '@angular/core'; // Added Inject and Renderer2
import { CommonModule, DOCUMENT } from '@angular/common'; // Added DOCUMENT
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {
  formData = {
    from_name: '',
    reply_to: '',
    phone: '',
    message: ''
  };

  isSending = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Initializing with your specific Public Key
    emailjs.init('KsjdBnGY37yl2sxRl'); 
    
    // Set Local Business Schema for the Contact Page
    this.setLocalBusinessSchema();
  }

  setLocalBusinessSchema() {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Filsafe",
      "image": "https://filsafe.com/public/FS_LOGO_BG.png", 
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Catleya Street, St. Peter Village, Camuning, Mexico, Pampanga",
        "addressLocality": "Angeles City",
        "addressRegion": "Pampanga",
        "postalCode": "2009",
        "addressCountry": "PH"
      },
      "telephone": "+63 920-932-6741",
      "url": "https://www.filsafe.shop/contact" 
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(localBusinessSchema);
    this.renderer.appendChild(this.document.head, script);
  }

  async sendEmail(e: Event) {
    e.preventDefault();
    this.isSending = true;

    const SERVICE_ID = 'service_gw1rf2c'; 
    const TEMPLATE_ID = 'template_ysxr4sl';
    const PUBLIC_KEY = 'KsjdBnGY37yl2sxRl';

    const templateParams = {
      from_name: this.formData.from_name,
      reply_to: this.formData.reply_to,
      phone: this.formData.phone,
      message: this.formData.message
    };

    try {
      const response = await emailjs.send(
        SERVICE_ID, 
        TEMPLATE_ID, 
        templateParams,
        PUBLIC_KEY
      );
      
      console.log('SUCCESS!', response.status, response.text);
      alert('Message sent successfully!');
      this.formData = { from_name: '', reply_to: '', phone: '', message: '' };
    } catch (error: any) {
      console.error('FAILED...', error);
      alert('Failed to send: ' + (error.text || 'Check your Service/Template IDs'));
    } finally {
      this.isSending = false;
    }
  }
}