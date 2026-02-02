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

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('http://localhost:3000/api/login', this.credentials).subscribe({
      next: (res: any) => {
        // Only set to true if the backend confirms success
        if (res.status === 'success') {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        alert('Access Denied: Invalid Admin Credentials');
      }
    });
  }
}