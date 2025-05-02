import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css'],
})
export class ApplyJobComponent implements OnInit {
  applyForm!: FormGroup;
  jobId: string = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id') || '';
    this.applyForm = this.fb.group({
      message: ['', Validators.required],
      resumeLink: [''],
    });
  }

  onSubmit(): void {
    if (this.applyForm.invalid) return;

    const payload = this.applyForm.value;

    console.log(`payload: ${payload}`);

    this.http
      .post(`http://localhost:8080/api/jobs/${this.jobId}/apply`, payload, {
        withCredentials: true,
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          this.successMessage = '✅ Application submitted successfully!';
          setTimeout(() => this.router.navigate(['/candidate/jobs']), 2000);
        },
        error: (err) => {
          this.errorMessage = err.error || 'Failed to submit application.';
        },
      });
  }
}
