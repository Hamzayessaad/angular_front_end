import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fullname: string = '';

  ngOnInit(): void {
    const token = this.getCookie('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.fullname = decoded.fullname || 'Employer';
      } catch (err) {
        this.fullname = 'Employer';
      }
    }
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
