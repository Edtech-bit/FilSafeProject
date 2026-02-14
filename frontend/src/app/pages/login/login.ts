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

  // This is the URL that gave you the "Cannot GET" message
  private readonly apiUrl = 'https://filsafeproject-3.onrender.com/api/users/login';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    // This .post() method is what the server is looking for
    this.http.post(this.apiUrl, this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('isLoggedIn', 'true');
        
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