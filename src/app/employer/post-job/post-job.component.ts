import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent {
  jobForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid) return;

    const jobData = this.jobForm.value;

    this.http.post('http://localhost:8080/api/jobs', jobData, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage = 'Job posted successfully!';
        this.jobForm.reset();
        setTimeout(() => this.router.navigate(['/employer/jobs']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to post job.';
      }
    });
  }
}
