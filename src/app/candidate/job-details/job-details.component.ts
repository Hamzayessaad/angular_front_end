import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job: any;
  errorMessage = '';
  alreadyApplied = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');

    // 1. Get job details
    this.http.get(`http://localhost:8080/api/jobs/${jobId}`).subscribe({
      next: (data) => this.job = data,
      error: (err) => this.errorMessage = err.error || 'Job not found.'
    });

    // 2. Check if candidate already applied
    this.http.get<boolean>(`http://localhost:8080/api/jobs/${jobId}/applied`, {
      withCredentials: true
    }).subscribe({
      next: (applied) => this.alreadyApplied = applied,
      error: () => this.alreadyApplied = false  // fallback if unauthenticated or error
    });
  }
}
