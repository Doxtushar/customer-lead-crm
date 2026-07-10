import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  template: `
    <section class="login-page">
      <div class="mesh mesh-one"></div>
      <div class="mesh mesh-two"></div>
      <div class="orbital-card">
        <mat-icon>query_stats</mat-icon>
        <span>Pipeline velocity</span>
        <strong>+32%</strong>
      </div>
      <div class="login-copy">
        <span class="eyebrow">CustomerLead CRM</span>
        <h2>One polished workspace for every customer conversation.</h2>
        <p>Track leads, follow ups, notes, and reminders with the speed and clarity of a modern enterprise CRM.</p>
        <div class="hero-visual" aria-hidden="true">
          <div class="visual-header"><span></span><span></span><span></span></div>
          <div class="visual-grid">
            <i></i><i></i><i></i><i></i>
          </div>
          <div class="visual-chart"><span></span><span></span><span></span><span></span></div>
        </div>
      </div>

      <mat-card class="login-card">
        <div class="login-brand">
          <span>CL</span>
          <div>
            <h1>CustomerLead CRM</h1>
            <p>Sign in to continue</p>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" autocomplete="username">
            <mat-icon matSuffix>person</mat-icon>
            <mat-error *ngIf="form.controls.username.invalid">Username is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" autocomplete="current-password">
            <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
              <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
            </button>
            <mat-error *ngIf="form.controls.password.invalid">Password is required</mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">
            <span>Login</span>
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </form>
      </mat-card>
    </section>
  `,
  styles: [`
    .login-page {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(340px, 440px);
      gap: 34px;
      align-items: center;
      padding: clamp(20px, 5vw, 72px);
      background:
      radial-gradient(circle at 15% 20%, rgba(59,130,246,.35) 0%, transparent 30%),
      radial-gradient(circle at 85% 15%, rgba(139,92,246,.25) 0%, transparent 30%),
      radial-gradient(circle at 80% 85%, rgba(16,185,129,.25) 0%, transparent 35%),
      radial-gradient(circle at 20% 80%, rgba(6,182,212,.20) 0%, transparent 35%),
      linear-gradient(135deg, #020617 0%, #0f172a 45%, #1e293b 100%);
    }
    .login-page::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -2;
      background:
        linear-gradient(
          120deg,
          rgba(255,255,255,.03),
          rgba(255,255,255,.01)
        );
    }
    .mesh { position: absolute; z-index: -1; width: 34rem; height: 34rem; border-radius: 50%; filter: blur(18px); opacity: .54; animation: floatMesh 9s ease-in-out infinite alternate; }
    .mesh-one { left: -10rem; top: -8rem; background: rgba(37,99,235,.34); }
    .mesh-two { right: -9rem; bottom: -10rem; background: rgba(18,183,106,.28); animation-delay: -4s; }
    .login-copy { max-width: 700px; color: #fff; animation: fadeUp .5s ease both; }
    .eyebrow { color: #bbf7d0; font-size: 13px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; text-shadow: 0 3px 14px rgba(0,0,0,.32); }
    .login-copy h2 { margin: 14px 0 12px; color: #ffffff; font-size: clamp(38px, 5.4vw, 70px); font-weight: 900; line-height: 1.02; text-shadow: 0 4px 16px rgba(0,0,0,.58), 0 18px 48px rgba(15,23,42,.34); }
    .login-copy p { max-width: 560px; color: rgba(255,255,255,.94); font-size: 18px; font-weight: 600; line-height: 1.7; text-shadow: 0 3px 12px rgba(0,0,0,.38); }
    .hero-visual { width: min(520px, 92%); margin-top: 34px; padding: 18px; border: 1px solid rgba(255,255,255,.24); border-radius: 26px; background: rgba(255,255,255,.16); box-shadow: 0 28px 72px rgba(15,23,42,.26); backdrop-filter: blur(10px); }
    .visual-header { display: flex; gap: 8px; margin-bottom: 18px; }
    .visual-header span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.72); }
    .visual-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 12px; }
    .visual-grid i, .visual-chart { min-height: 54px; border-radius: 16px; background: rgba(255,255,255,.16); }
    .visual-grid i:first-child { grid-row: span 2; min-height: 120px; background: linear-gradient(135deg, rgba(103,232,249,.35), rgba(34,197,94,.24)); }
    .visual-chart { display: flex; align-items: flex-end; gap: 10px; margin-top: 12px; padding: 12px; }
    .visual-chart span { flex: 1; border-radius: 999px 999px 6px 6px; background: linear-gradient(180deg, #67e8f9, #22c55e); }
    .visual-chart span:nth-child(1) { height: 42px; } .visual-chart span:nth-child(2) { height: 74px; } .visual-chart span:nth-child(3) { height: 56px; } .visual-chart span:nth-child(4) { height: 92px; }
    .login-card { width: min(440px, 100%); padding: 32px; border: 1px solid rgba(255,255,255,.74); border-radius: 28px; background: rgba(255,255,255,.88); box-shadow: 0 30px 90px rgba(15,23,42,.26); backdrop-filter: blur(18px); animation: fadeUp .58s .08s ease both; }
    .login-brand { display: flex; gap: 14px; align-items: center; margin-bottom: 24px; }
    .login-brand span { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 18px; background: #111827; color: #67e8f9; font-weight: 900; box-shadow: 0 14px 34px rgba(15,23,42,.24); }
    h1 { margin: 0; color: #0f172a; font-size: 24px; font-weight: 900; }
    p { margin: 4px 0 0; color: #334155; font-weight: 600; }
    form { display: grid; gap: 14px; }
    button[type="submit"] { height: 50px; font-weight: 900; }
    button[type="submit"] mat-icon { margin: 0 0 0 8px; }
    .orbital-card { position: absolute; right: 42%; bottom: 12%; display: grid; gap: 3px; min-width: 176px; padding: 16px; border: 1px solid rgba(255,255,255,.34); border-radius: 22px; color: #fff; background: rgba(15,23,42,.46); box-shadow: 0 22px 50px rgba(15,23,42,.28); backdrop-filter: blur(10px); animation: floatMesh 2s ease-in-out infinite alternate; }
    .orbital-card mat-icon { color: #67e8f9; }
    .orbital-card span { color: rgba(255,255,255,.9); font-weight: 800; }
    .orbital-card strong { font-size: 26px; }
    :host ::ng-deep .login-card .mat-mdc-form-field .mdc-notched-outline__leading,
    :host ::ng-deep .login-card .mat-mdc-form-field .mdc-notched-outline__notch,
    :host ::ng-deep .login-card .mat-mdc-form-field .mdc-notched-outline__trailing {
      border-color: #64748b !important;
    }
    :host ::ng-deep .login-card .mat-mdc-form-field.mat-focused .mdc-notched-outline__leading,
    :host ::ng-deep .login-card .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch,
    :host ::ng-deep .login-card .mat-mdc-form-field.mat-focused .mdc-notched-outline__trailing {
      border-color: #1d4ed8 !important;
      border-width: 2px !important;
    }
    :host ::ng-deep .login-card .mat-mdc-form-field .mdc-floating-label,
    :host ::ng-deep .login-card .mat-mdc-form-field .mat-mdc-input-element,
    :host ::ng-deep .login-card .mat-mdc-form-field .mat-mdc-form-field-icon-suffix,
    :host ::ng-deep .login-card .mat-mdc-form-field mat-icon {
      color: #334155 !important;
    }
    :host ::ng-deep .login-card .mat-mdc-form-field .mat-mdc-input-element::placeholder {
      color: #475569 !important;
      opacity: 1;
    }
    @media (max-width: 860px) {
      .login-page { grid-template-columns: 1fr; }
      .login-copy, .orbital-card { display: none; }
      .login-card { margin: 0 auto; }
    }
    @keyframes meshShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes floatMesh {
      from {
        transform: translate3d(0,0,0) scale(1);
      }
      to {
        transform: translate3d(35px,-25px,0) scale(1.06);
      }
    }    
    @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly notifications = inject(NotificationService);

  hidePassword = true;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.notifications.success('Login successful');
        this.router.navigateByUrl('/dashboard');
      },
      error: () => this.notifications.error('Invalid username or password')
    });
  }
}
