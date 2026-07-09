import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    LoadingSpinnerComponent
  ],
  template: `
    <app-loading-spinner></app-loading-spinner>

    <ng-container *ngIf="!isLoginRoute(); else authOnly">
      <mat-sidenav-container class="shell">
        <mat-sidenav
          class="sidebar"
          [mode]="isMobile ? 'over' : 'side'"
          [opened]="!isMobile || sidebarOpen"
          (closedStart)="sidebarOpen = false">
          <div class="brand">
            <span class="brand-mark">CL</span>
            <div>
              <strong>CustomerLead CRM</strong>
              <small>Sales workspace</small>
            </div>
          </div>

          <nav class="nav-list">
            <a *ngFor="let item of navItems"
               [routerLink]="item.path"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: item.path === '/dashboard' }"
               (click)="closeMobileSidebar()">
              <mat-icon>{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </a>
          </nav>
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-toolbar class="topbar">
            <button mat-icon-button matTooltip="Menu" (click)="sidebarOpen = !sidebarOpen">
              <mat-icon>menu</mat-icon>
            </button>
            <span class="page-title">{{ currentTitle() }}</span>
            <span class="topbar-spacer"></span>
            <button mat-stroked-button color="primary" (click)="logout()">
              <mat-icon>logout</mat-icon>
              Logout
            </button>
          </mat-toolbar>

          <main class="content">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </ng-container>

    <ng-template #authOnly>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    .shell { min-height: 100vh; background: transparent; }
    .sidebar { width: 292px; border-right: 1px solid rgba(255,255,255,.12); background: linear-gradient(180deg, #101828, #111827 58%, #0f172a); color: #fff; }
    .brand { display: flex; gap: 12px; align-items: center; padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,.12); }
    .brand-mark { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 8px; background: linear-gradient(135deg, #22c55e, #86efac); color: #052e16; font-weight: 900; box-shadow: 0 12px 28px rgba(34,197,94,.22); }
    .brand strong, .brand small { display: block; line-height: 1.2; }
    .brand small { color: #a7b0c0; margin-top: 4px; }
    .nav-list { display: grid; gap: 6px; padding: 16px 12px; }
    .nav-list a { display: flex; align-items: center; gap: 12px; min-height: 46px; padding: 0 13px; color: #dbe4f0; text-decoration: none; border-radius: 8px; font-weight: 700; }
    .nav-list a mat-icon { color: #9fb0c7; }
    .nav-list a:hover, .nav-list a.active { background: rgba(255,255,255,.11); color: #fff; }
    .nav-list a.active { box-shadow: inset 3px 0 0 #22c55e; }
    .nav-list a:hover mat-icon, .nav-list a.active mat-icon { color: #86efac; }
    .topbar { position: sticky; top: 0; z-index: 5; height: 68px; background: rgba(255,255,255,.92); color: #1f2937; border-bottom: 1px solid #dde3ec; backdrop-filter: blur(12px); }
    .page-title { margin-left: 12px; font-weight: 900; }
    .topbar-spacer { flex: 1; }
    .content { padding: 26px; max-width: 1480px; margin: 0 auto; }
    @media (max-width: 720px) {
      .content { padding: 16px; }
      .page-title { font-size: 16px; }
      button[mat-stroked-button] { min-width: 44px; padding: 0 10px; }
    }
  `]
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  sidebarOpen = false;
  isMobile = window.innerWidth < 900;

  navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/lead-types', label: 'Lead Types', icon: 'category' },
    { path: '/customer-leads', label: 'Customer Leads', icon: 'groups' },
    { path: '/follow-ups', label: 'Follow Ups', icon: 'event_available' },
    { path: '/notes', label: 'Notes', icon: 'sticky_note_2' },
    { path: '/reminders', label: 'Reminders', icon: 'notifications_active' }
  ];

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth < 900;
    this.sidebarOpen = !this.isMobile;
  }

  isLoginRoute(): boolean {
    return this.router.url.startsWith('/login');
  }

  currentTitle(): string {
    const item = this.navItems.find((navItem) => this.router.url.startsWith(navItem.path));
    return item?.label ?? 'Dashboard';
  }

  closeMobileSidebar(): void {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
