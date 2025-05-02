import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.http.get<any[]>('http://localhost:8080/api/employer/jobs').subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load jobs.';
      }
    });
  }

  deleteJob(jobId: number): void {
    if (!confirm('Are you sure you want to delete this job?')) return;

    this.http.delete(`http://localhost:8080/api/employer/jobs/${jobId}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage = 'Job deleted successfully.';
        this.jobs = this.jobs.filter(job => job.id !== jobId);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to delete job.';
      }
    });
  }

  editJob(job: any): void {
    localStorage.setItem('editJob', JSON.stringify(job));
    this.router.navigate(['/employer/edit-job']);
  }
}
