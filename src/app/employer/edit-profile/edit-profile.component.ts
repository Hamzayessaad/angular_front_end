import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employer-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/api/auth/me', { withCredentials: true }).subscribe({
      next: user => {
        this.profileForm = this.fb.group({
          fullname: [user.fullname, Validators.required],
          password: ['', Validators.minLength(5)]
        });
      },
      error: err => this.errorMessage = err.error || 'Failed to load profile.'
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const updatedData = this.profileForm.value;

    this.http.put('http://localhost:8080/api/auth/profile', updatedData, {
      withCredentials: true,
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully.';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/employer/profile']), 1500);
      },
      error: err => {
        this.errorMessage = err.error || 'Failed to update profile.';
        this.successMessage = '';
      }
    });
  }
}
