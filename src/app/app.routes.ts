import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./candidate/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'candidate/jobs',
    loadComponent: () =>
      import('./candidate/jobs/jobs.component').then((m) => m.JobsComponent),
  },
  {
    path: 'candidate/profile',
    loadComponent: () =>
      import('./candidate/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'employer/dashboard',
    loadComponent: () =>
      import('./employer/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'employer/post-job',
    loadComponent: () =>
      import('./employer/post-job/post-job.component').then(
        (m) => m.PostJobComponent
      ),
  },
  {
    path: 'employer/jobs',
    loadComponent: () =>
      import('./employer/jobs/jobs.component').then((m) => m.JobsComponent),
  },
  {
    path: 'employer/applications',
    loadComponent: () =>
      import('./employer/applications/applications.component').then(
        (m) => m.ApplicationsComponent
      ),
  },
  {
    path: 'employer/post-job',
    loadComponent: () =>
      import('./employer/post-job/post-job.component').then(
        (m) => m.PostJobComponent
      ),
  },
  {
    path: 'candidate/jobs',
    loadComponent: () =>
      import('./candidate/jobs/jobs.component').then((m) => m.JobsComponent),
  },
  {
    path: 'candidate/jobs/:id',
    loadComponent: () =>
      import('./candidate/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent
      ),
  },
  {
    path: 'candidate/profile/edit',
    loadComponent: () =>
      import('./candidate/edit-profile/edit-profile.component').then(
        (m) => m.EditProfileComponent
      ),
  },
  {
    path: 'employer/profile/edit',
    loadComponent: () =>
      import('./employer/edit-profile/edit-profile.component').then(
        (m) => m.EditProfileComponent
      ),
  },
];
