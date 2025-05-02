import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // ✅ import this

@Component({
  selector: 'app-candidate-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ include here
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/jobs').subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load jobs.';
      }
    });
  }
}
