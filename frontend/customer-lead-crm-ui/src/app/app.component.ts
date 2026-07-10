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
          [class.sidebar-collapsed]="sidebarCollapsed && !isMobile"
          [mode]="isMobile ? 'over' : 'side'"
          [opened]="!isMobile || sidebarOpen"
          (closedStart)="sidebarOpen = false">
          <div class="brand">
            <span class="brand-mark">CL</span>
            <div class="brand-text">
              <strong>CustomerLead CRM</strong>
              <small>Sales workspace</small>
            </div>
          </div>

          <nav class="nav-list">
            <a *ngFor="let item of navItems"
               [routerLink]="item.path"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: item.path === '/dashboard' }"
               [matTooltip]="sidebarCollapsed && !isMobile ? item.label : ''"
               (click)="closeMobileSidebar()">
              <mat-icon>{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </a>
          </nav>
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-toolbar class="topbar">
            <button mat-icon-button matTooltip="Menu" (click)="toggleSidebar()">
              <mat-icon>menu</mat-icon>
            </button>
            <div class="topbar-title">
              <span class="page-title">{{ currentTitle() }}</span>
              <small>Enterprise CRM workspace</small>
            </div>
            <span class="topbar-spacer"></span>
            <span class="topbar-chip">
              <mat-icon>bolt</mat-icon>
              Live
            </span>
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
    .sidebar { width: 292px; border-right: 1px solid rgba(255,255,255,.14); background: linear-gradient(180deg, #0f172a, #111827 55%, #101828); color: #fff; transition: width .22s ease; }
    .sidebar::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 20% 8%, rgba(37,99,235,.28), transparent 15rem), radial-gradient(circle at 100% 26%, rgba(6,182,212,.2), transparent 13rem); }
    .sidebar-collapsed { width: 86px; }
    .brand { position: relative; display: flex; gap: 12px; align-items: center; min-height: 86px; padding: 22px 20px; border-bottom: 1px solid rgba(255,255,255,.12); }
    .brand-mark { flex: 0 0 auto; display: grid; place-items: center; width: 48px; height: 48px; border-radius: 16px; background: linear-gradient(135deg, #67e8f9, #22c55e); color: #052e16; font-weight: 900; box-shadow: 0 14px 34px rgba(34,197,94,.22); }
    .brand-text { min-width: 0; transition: opacity .16s ease; }
    .sidebar-collapsed .brand-text, .sidebar-collapsed .nav-list a span { opacity: 0; pointer-events: none; width: 0; overflow: hidden; }
    .brand strong, .brand small { display: block; line-height: 1.2; }
    .brand small { color: #a7b0c0; margin-top: 4px; }
    .nav-list { position: relative; display: grid; gap: 8px; padding: 18px 12px; }
    .nav-list a { position: relative; display: flex; align-items: center; gap: 12px; min-height: 48px; padding: 0 14px; color: #dbe4f0; text-decoration: none; border-radius: 16px; font-weight: 800; transition: background .18s ease, color .18s ease, transform .18s ease; }
    .sidebar-collapsed .nav-list a { justify-content: center; padding: 0; }
    .nav-list a mat-icon { flex: 0 0 auto; color: #9fb0c7; }
    .nav-list a:hover, .nav-list a.active { background: rgba(255,255,255,.12); color: #fff; transform: translateX(2px); }
    .nav-list a.active::before { content: ''; position: absolute; left: -12px; top: 10px; bottom: 10px; width: 4px; border-radius: 999px; background: linear-gradient(180deg, #67e8f9, #22c55e); box-shadow: 0 0 18px rgba(103,232,249,.6); }
    .nav-list a:hover mat-icon, .nav-list a.active mat-icon { color: #67e8f9; }
    .topbar { position: sticky; top: 0; z-index: 5; height: 72px; gap: 12px; background: rgba(255,255,255,.78); color: #1f2937; border-bottom: 1px solid rgba(126,143,166,.22); backdrop-filter: blur(18px); }
    .topbar-title { display: grid; margin-left: 2px; line-height: 1.15; }
    .page-title { font-weight: 900; }
    .topbar-title small { color: #667085; font-size: 12px; font-weight: 700; }
    .topbar-spacer { flex: 1; }
    .topbar-chip { display: inline-flex; align-items: center; gap: 6px; min-height: 34px; padding: 0 12px; border-radius: 999px; color: #027a48; background: #ecfdf3; font-size: 12px; font-weight: 900; }
    .topbar-chip mat-icon { width: 16px; height: 16px; font-size: 16px; margin: 0; }
    .content { padding: 28px; max-width: 1480px; margin: 0 auto; animation: route-fade .32s ease both; }
    @media (max-width: 720px) {
      .content { padding: 16px; }
      .page-title { font-size: 16px; }
      .topbar-title small, .topbar-chip { display: none; }
      button[mat-stroked-button] { min-width: 44px; padding: 0 10px; }
    }
    @keyframes route-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  `]
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  sidebarOpen = false;
  sidebarCollapsed = false;
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
    this.sidebarCollapsed = false;
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

  toggleSidebar(): void {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
      return;
    }

    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
