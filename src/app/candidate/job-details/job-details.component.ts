import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // ✅ import this

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ include RouterModule here
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job: any;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8080/api/jobs/${jobId}`).subscribe({
      next: (data) => this.job = data,
      error: (err) => this.errorMessage = err.error || 'Job not found.'
    });
  }
}
