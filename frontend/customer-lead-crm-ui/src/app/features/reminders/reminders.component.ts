import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CustomerLead } from '../../core/models/customer-lead.model';
import { FollowUp } from '../../core/models/follow-up.model';
import { CustomerLeadService } from '../../core/services/customer-lead.service';
import { FollowUpService } from '../../core/services/follow-up.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  template: `
    <header class="page-header">
      <div>
        <h1>Reminders</h1>
        <p>Pending follow ups due today or overdue.</p>
      </div>
      <button mat-raised-button color="primary" (click)="load()">
        <mat-icon>refresh</mat-icon>
        Refresh
      </button>
    </header>

    <section class="reminder-grid">
      <div class="panel reminder-summary">
        <mat-icon>warning</mat-icon>
        <div>
          <span>Overdue</span>
          <strong>{{ overdue.length }}</strong>
        </div>
      </div>
      <div class="panel reminder-summary">
        <mat-icon>today</mat-icon>
        <div>
          <span>Due Today</span>
          <strong>{{ dueToday.length }}</strong>
        </div>
      </div>
      <div class="panel reminder-summary">
        <mat-icon>schedule</mat-icon>
        <div>
          <span>Upcoming</span>
          <strong>{{ upcoming.length }}</strong>
        </div>
      </div>
    </section>

    <section class="panel mt-3">
      <div class="table-toolbar">
        <strong>Reminder Queue</strong>
      </div>
      <div class="table-wrap">
        <table mat-table [dataSource]="reminders">
          <ng-container matColumnDef="customerName">
            <th mat-header-cell *matHeaderCellDef>Customer</th>
            <td mat-cell *matCellDef="let row">
              <div class="reminder-customer">
                <span><mat-icon>person_pin</mat-icon></span>
                <strong>{{ customerName(row.customerLeadId) }}</strong>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="nextFollowUpDate">
            <th mat-header-cell *matHeaderCellDef>Due Date</th>
            <td mat-cell *matCellDef="let row">{{ row.nextFollowUpDate || row.followUpDate | date:'mediumDate' }}</td>
          </ng-container>
          <ng-container matColumnDef="discussion">
            <th mat-header-cell *matHeaderCellDef>Discussion</th>
            <td mat-cell *matCellDef="let row">{{ row.discussion }}</td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row"><span class="status-chip">{{ reminderStatus(row) }}</span></td>
          </ng-container>
          <ng-container matColumnDef="backendStatus">
            <th mat-header-cell *matHeaderCellDef>Follow Up Status</th>
            <td mat-cell *matCellDef="let row">{{ row.status || '-' }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
        <div class="empty-state" *ngIf="!reminders.length">No pending reminders.</div>
      </div>
    </section>
  `,
  styles: [`
    .reminder-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .reminder-summary { position: relative; overflow: hidden; display: flex; align-items: center; gap: 14px; padding: 20px; border-radius: 22px; }
    .reminder-summary::after { content: ''; position: absolute; inset: auto 16px 0 16px; height: 4px; border-radius: 999px 999px 0 0; background: linear-gradient(90deg, #f79009, #ef4444); }
    .reminder-summary:nth-child(2)::after { background: linear-gradient(90deg, #2563eb, #06b6d4); }
    .reminder-summary:nth-child(3)::after { background: linear-gradient(90deg, #12b76a, #06b6d4); }
    .reminder-summary mat-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 16px; background: linear-gradient(135deg, #fff7ed, #fee2e2); color: #c2410c; font-size: 26px; }
    .reminder-summary span { display: block; color: #667085; }
    .reminder-summary strong { display: block; margin-top: 4px; font-size: 30px; color: #101828; }
    .reminder-customer { display: flex; align-items: center; gap: 12px; }
    .reminder-customer span { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 14px; background: #eef6ff; color: #175cd3; }
    .reminder-customer mat-icon { width: 21px; height: 21px; font-size: 21px; }
    @media (max-width: 760px) { .reminder-grid { grid-template-columns: 1fr; } }
  `]
})
export class RemindersComponent implements OnInit {
  private readonly followUpService = inject(FollowUpService);
  private readonly leadService = inject(CustomerLeadService);
  private readonly notifications = inject(NotificationService);

  columns = ['customerName', 'nextFollowUpDate', 'discussion', 'status', 'backendStatus'];
  reminders: FollowUp[] = [];
  overdue: FollowUp[] = [];
  dueToday: FollowUp[] = [];
  upcoming: FollowUp[] = [];
  leads: CustomerLead[] = [];

  ngOnInit(): void {
    this.load();
    this.leadService.list().subscribe({ next: (leads) => this.leads = leads });
  }

  load(): void {
    this.followUpService.list().subscribe({
      next: (followUps) => {
        this.reminders = followUps
          .filter((item) => item.status !== 'CLOSED_WON' && item.status !== 'CLOSED_LOST')
          .sort((a, b) => this.dueTime(a) - this.dueTime(b));

        this.overdue = this.reminders.filter((item) => this.reminderStatus(item) === 'Overdue');
        this.dueToday = this.reminders.filter((item) => this.reminderStatus(item) === 'Due Today');
        this.upcoming = this.reminders.filter((item) => this.reminderStatus(item) === 'Upcoming');
      },
      error: () => this.notifications.error('Unable to load reminders')
    });
  }

  reminderStatus(item: FollowUp): string {
    const due = this.startOfDay(new Date(item.nextFollowUpDate || item.followUpDate));
    const today = this.startOfDay(new Date());

    if (due.getTime() < today.getTime()) {
      return 'Overdue';
    }

    if (due.getTime() === today.getTime()) {
      return 'Due Today';
    }

    return 'Upcoming';
  }

  customerName(customerLeadId: number): string {
    return this.leads.find((lead) => lead.id === customerLeadId)?.customerName ?? `Lead #${customerLeadId}`;
  }

  private dueTime(item: FollowUp): number {
    return new Date(item.nextFollowUpDate || item.followUpDate).getTime();
  }

  private startOfDay(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
