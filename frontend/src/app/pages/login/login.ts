import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials = { username: '', password: '' };

  // FIXED: Removed /users to match app.post('/api/login') in server.js
  private readonly apiUrl = 'https://filsafeproject-3.onrender.com/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post(this.apiUrl, this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('isLoggedIn', 'true');
        
        // If your backend sends a token, store it
        if (res.token) {
          localStorage.setItem('adminToken', res.token);
        }

        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Login Error:', err);
        alert('Access Denied: Invalid Admin Credentials');
      }
    });
  }
}