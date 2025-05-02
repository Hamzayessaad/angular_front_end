import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidate-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit {
  applications: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/api/user/applications', {
        withCredentials: true,
      })
      .subscribe({
        next: (data) => (this.applications = data),
        error: (err) =>
          (this.errorMessage = err.error || 'Failed to load applications.'),
      });
  }
  getSafeUrl(link: string): string {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      return 'https://' + link;
    }
    return link;
  }
}
