import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface UserProfile {
  fullname: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-candidate-profile',  // or 'app-employer-profile' if in employer folder
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<UserProfile>('http://localhost:8080/api/auth/me', { withCredentials: true })
      .subscribe({
        next: data => this.profile = data,
        error: err => this.errorMessage = err.error || 'Failed to load profile.'
      });
  }
}
