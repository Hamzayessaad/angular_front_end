import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'candidate/dashboard',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'candidate/jobs',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/jobs/jobs.component').then((m) => m.JobsComponent),
  },
  {
    path: 'candidate/profile',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'employer/dashboard',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./employer/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'employer/post-job',
    canActivate: [authGuard],
    data: { role: 'employer' },
    loadComponent: () =>
      import('./employer/post-job/post-job.component').then(
        (m) => m.PostJobComponent
      ),
  },
  {
    path: 'employer/jobs',
    canActivate: [authGuard],
    data: { role: 'employer' },
    loadComponent: () =>
      import('./employer/jobs/jobs.component').then((m) => m.JobsComponent),
  },
  {
    path: 'employer/applications',
    canActivate: [authGuard],
    data: { role: 'employer' },
    loadComponent: () =>
      import('./employer/applications/applications.component').then(
        (m) => m.ApplicationsComponent
      ),
  },
  {
    path: 'employer/post-job',
    canActivate: [authGuard],
    data: { role: 'employer' },
    loadComponent: () =>
      import('./employer/post-job/post-job.component').then(
        (m) => m.PostJobComponent
      ),
  },
  {
    path: 'candidate/jobs',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/jobs/jobs.component').then((m) => m.JobsComponent),
  },
  {
    path: 'candidate/jobs/:id',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent
      ),
  },
  {
    path: 'candidate/profile/edit',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/edit-profile/edit-profile.component').then(
        (m) => m.EditProfileComponent
      ),
  },
  {
    path: 'employer/profile/edit',
    canActivate: [authGuard],
    data: { role: 'employer' },
    loadComponent: () =>
      import('./employer/edit-profile/edit-profile.component').then(
        (m) => m.EditProfileComponent
      ),
  },
  {
    path: 'employer/edit-job',
    canActivate: [authGuard],
    data: { role: 'employer' },
    loadComponent: () =>
      import('./employer/edit-job/edit-job.component').then(
        (m) => m.EditJobComponent
      ),
  },
  {
    path: 'candidate/jobs/:id/apply',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/apply-job/apply-job.component').then(
        (m) => m.ApplyJobComponent
      ),
  },
  {
    path: 'candidate/applications',
    canActivate: [authGuard],
    data: { role: 'candidate' },
    loadComponent: () =>
      import('./candidate/applications/applications.component').then(
        (m) => m.ApplicationsComponent
      ),
  },
  {
    path: 'employer/applications',
    canActivate: [authGuard],
    data: { role: 'employer' },
    loadComponent: () =>
      import('./employer/applications/applications.component').then(
        (m) => m.ApplicationsComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
];
