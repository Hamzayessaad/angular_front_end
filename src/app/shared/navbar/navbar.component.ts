import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn = false;
  fullname: string = '';

  constructor() {
    const token = this.getCookie('token');
    if (token) {
      const formattedtToken = token.split(':')[1];
      console.log(formattedtToken);
      try {
        const decoded: any = jwtDecode(formattedtToken);
        this.fullname = decoded.fullname || 'User';
        this.isLoggedIn = true;
      } catch (e) {
        this.isLoggedIn = false;
      }
    }
  }

  logout(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? match[2] : null;
  }
}
