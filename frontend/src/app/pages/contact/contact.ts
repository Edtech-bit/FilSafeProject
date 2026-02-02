import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  ngOnInit() {
    // Initializing with your specific Public Key
    emailjs.init('KsjdBnGY37yl2sxRl'); 
  }

  async sendEmail(e: Event) {
    e.preventDefault();
    this.isSending = true;

    // Use your specific IDs from the EmailJS Dashboard here:
    const SERVICE_ID = 'service_gw1rf2c'; 
    const TEMPLATE_ID = 'template_ysxr4sl';
    const PUBLIC_KEY = 'KsjdBnGY37yl2sxRl';

    // Mapping the data to match your EmailJS Template variables
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
      
      // Clear the form after success
      this.formData = { from_name: '', reply_to: '', phone: '', message: '' };
    } catch (error: any) {
      console.error('FAILED...', error);
      // Detailed error alert to help you if IDs are still wrong
      alert('Failed to send: ' + (error.text || 'Check your Service/Template IDs'));
    } finally {
      this.isSending = false;
    }
  }
}