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

  private readonly apiUrl = 'https://filsafeproject-2.onrender.com/api/users/login';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post(this.apiUrl, this.credentials).subscribe({
      next: (res: any) => {
        // We save the login state
        localStorage.setItem('isLoggedIn', 'true');
        
        // If your backend sends a token, save it
        if (res.token) {
          localStorage.setItem('adminToken', res.token);
        }

        // Move to the admin dashboard
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Login Error details:', err);
        alert('Access Denied: Invalid Admin Credentials');
      }
    });
  }
}