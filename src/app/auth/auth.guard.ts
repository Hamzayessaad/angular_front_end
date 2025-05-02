import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const token = getCookie('token');
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true;

  // try {
  //   const decoded: any = jwtDecode(token);
  //   const requiredRole = route.data['role'];
  //   if (!requiredRole || decoded.role === requiredRole) {
  //     return true;
  //   } else {
  //     router.navigate(['/unauthorized']);
  //     return false;
  //   }
  // } catch {
  //   router.navigate(['/login']);
  //   return false;
  // }
};

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
