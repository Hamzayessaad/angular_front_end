import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.http
      .post('http://localhost:8080/api/auth/login', credentials, {
        responseType: 'text',
      })
      .subscribe({
        next: (token: string) => {
          // Save JWT in cookie
          document.cookie = `token=${token}; path=/`;

          // Decode token to get role
          try {
            const decoded: any = jwtDecode(token);
            const role = decoded.role; // assumes your JWT payload includes "role"
            console.log(decoded);
            console.log(role);
            // Redirect based on role
            if (role === 'employer') {
              this.router.navigate(['/employer/dashboard']);
            } else if (role === 'candidate') {
              this.router.navigate(['/candidate/dashboard']);
            } else if (role === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.errorMessage = 'Unknown user role.';
            }
          } catch (e) {
            this.errorMessage = 'Invalid token received.';
          }
        },
        error: (err) => {
          this.errorMessage = err.error || 'Login failed. Please try again.';
        },
      });
  }
}
