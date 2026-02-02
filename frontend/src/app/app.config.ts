import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill/config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    provideRouter(routes),
    
    provideHttpClient(),

    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],               // Text formatting
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],  // Bullets and Numbers
          ['link', 'image', 'clean']                     // ADDED 'image' HERE for uploads
        ]
      },
      placeholder: 'Share your security expertise...',
      theme: 'snow' 
    })
  ]
};