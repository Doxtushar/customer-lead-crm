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
      <div class="login-copy">
        <span class="eyebrow">CustomerLead CRM</span>
        <h2>Manage leads, follow ups, notes, and reminders from one workspace.</h2>
        <p>Fast dashboard views, responsive CRM workflows, and installable PWA support for your sales team.</p>
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
            Login
          </button>
        </form>
      </mat-card>
    </section>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(340px, 440px);
      gap: 34px;
      align-items: center;
      padding: clamp(20px, 5vw, 72px);
      background:
        radial-gradient(circle at 12% 18%, rgba(34,197,94,.18), transparent 26%),
        radial-gradient(circle at 88% 8%, rgba(23,92,211,.18), transparent 28%),
        linear-gradient(135deg, #eef7ff 0%, #f8fafc 52%, #ecfdf3 100%);
    }
    .login-copy { max-width: 680px; }
    .eyebrow { color: #175cd3; font-size: 13px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
    .login-copy h2 { margin: 14px 0 12px; color: #101828; font-size: clamp(34px, 5vw, 58px); font-weight: 900; line-height: 1.02; }
    .login-copy p { max-width: 560px; color: #475467; font-size: 17px; line-height: 1.7; }
    .login-card { width: min(440px, 100%); padding: 30px; border: 1px solid rgba(255,255,255,.7); border-radius: 8px; box-shadow: 0 24px 70px rgba(15,23,42,.16); }
    .login-brand { display: flex; gap: 14px; align-items: center; margin-bottom: 24px; }
    .login-brand span { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 8px; background: #111827; color: #22c55e; font-weight: 900; box-shadow: 0 12px 28px rgba(15,23,42,.22); }
    h1 { margin: 0; font-size: 24px; font-weight: 800; }
    p { margin: 4px 0 0; color: #667085; }
    form { display: grid; gap: 12px; }
    button[type="submit"] { height: 46px; font-weight: 800; }
    @media (max-width: 860px) {
      .login-page { grid-template-columns: 1fr; }
      .login-copy { display: none; }
      .login-card { margin: 0 auto; }
    }
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
