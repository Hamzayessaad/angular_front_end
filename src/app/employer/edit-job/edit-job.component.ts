import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  jobForm!: FormGroup;
  jobId: number = 0;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const jobData = localStorage.getItem('editJob');
    if (jobData) {
      const job = JSON.parse(jobData);
      this.jobId = job.id;

      this.jobForm = this.fb.group({
        title: [job.title, Validators.required],
        description: [job.description, Validators.required],
        location: [job.location, Validators.required]
      });
    } else {
      this.errorMessage = 'No job selected for editing.';
    }
  }

  onSubmit(): void {
    if (this.jobForm.invalid) return;

    const updatedJob = this.jobForm.value;

    this.http.put(`http://localhost:8080/api/employer/jobs/${this.jobId}`, updatedJob, {
      withCredentials: true,
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.successMessage = 'Job updated successfully.';
        setTimeout(() => this.router.navigate(['/employer/jobs']), 1500);
      },
      error: err => {
        this.errorMessage = err.error || 'Failed to update job.';
      }
    });
  }
}
