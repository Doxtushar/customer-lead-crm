import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { CustomerLead } from '../../core/models/customer-lead.model';
import { FollowUp } from '../../core/models/follow-up.model';
import { CustomerLeadService } from '../../core/services/customer-lead.service';
import { FollowUpService } from '../../core/services/follow-up.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-follow-ups',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule],
  template: `
    <header class="page-header">
      <div>
        <h1>Follow Ups</h1>
        <p>Schedule, complete, and review customer follow-up activities.</p>
      </div>
      <button mat-raised-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon>
        Add Follow Up
      </button>
    </header>

    <section class="panel">
      <div class="table-toolbar">
        <strong>{{ data.length }} records</strong>
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search</mat-label>
          <input matInput [(ngModel)]="searchTerm">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <button mat-stroked-button (click)="load()"><mat-icon>refresh</mat-icon>Refresh</button>
      </div>
      <div class="table-wrap">
        <table mat-table [dataSource]="filteredData">
          <ng-container matColumnDef="customerName">
            <th mat-header-cell *matHeaderCellDef>Customer</th>
            <td mat-cell *matCellDef="let row">
              <div class="activity-cell">
                <span><mat-icon>event_available</mat-icon></span>
                <strong>{{ customerName(row.customerLeadId) }}</strong>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="followUpDate">
            <th mat-header-cell *matHeaderCellDef>Follow Up</th>
            <td mat-cell *matCellDef="let row">{{ row.followUpDate | date:'mediumDate' }}</td>
          </ng-container>
          <ng-container matColumnDef="nextFollowUpDate">
            <th mat-header-cell *matHeaderCellDef>Next</th>
            <td mat-cell *matCellDef="let row">{{ row.nextFollowUpDate ? (row.nextFollowUpDate | date:'mediumDate') : '-' }}</td>
          </ng-container>
          <ng-container matColumnDef="discussion">
            <th mat-header-cell *matHeaderCellDef>Discussion</th>
            <td mat-cell *matCellDef="let row"><span class="note-preview">{{ row.discussion }}</span></td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row"><span class="status-chip">{{ row.status }}</span></td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let row" class="text-end">
              <button mat-icon-button color="primary" (click)="openForm(row)"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button color="warn" (click)="remove(row)"><mat-icon>delete</mat-icon></button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
        <div class="empty-state" *ngIf="!filteredData.length">No follow ups found.</div>
      </div>
    </section>
  `,
  styles: [`
    .activity-cell { display: flex; align-items: center; gap: 12px; }
    .activity-cell span { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 14px; background: linear-gradient(135deg, #ecfdf3, #ecfeff); color: #16a34a; box-shadow: inset 0 0 0 1px rgba(18,183,106,.14); }
    .activity-cell mat-icon { font-size: 21px; width: 21px; height: 21px; }
    .mode-badge { display: inline-flex; align-items: center; min-height: 28px; padding: 0 10px; border-radius: 999px; background: #f2f4f7; color: #344054; font-size: 12px; font-weight: 800; }
  `]
})
export class FollowUpsComponent implements OnInit {
  private readonly service = inject(FollowUpService);
  private readonly leadService = inject(CustomerLeadService);
  private readonly dialog = inject(MatDialog);
  private readonly notifications = inject(NotificationService);

  columns = ['customerName', 'followUpDate', 'nextFollowUpDate', 'discussion', 'status', 'actions'];
  data: FollowUp[] = [];
  leads: CustomerLead[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.load();
    this.leadService.list().subscribe({ next: (leads) => this.leads = leads });
  }

  load(): void {
    this.service.list().subscribe({ next: (data) => this.data = data });
  }

  get filteredData(): FollowUp[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.data;
    }

    return this.data.filter((row) =>
      [
        this.customerName(row.customerLeadId),
        row.followUpDate,
        row.nextFollowUpDate,
        row.discussion,
        row.status
      ].some((value) => `${value ?? ''}`.toLowerCase().includes(term))
    );
  }

  customerName(customerLeadId: number): string {
    return this.leads.find((lead) => lead.id === customerLeadId)?.customerName ?? `Lead #${customerLeadId}`;
  }

  openForm(row?: FollowUp): void {
    this.dialog.open(FollowUpDialogComponent, { width: '760px', data: row }).afterClosed().subscribe((saved) => {
      if (saved) {
        this.load();
      }
    });
  }

  remove(row: FollowUp): void {
    if (!row.id || !confirm('Delete this follow up?')) {
      return;
    }

    this.service.delete(row.id).subscribe({
      next: () => {
        this.notifications.success('Follow up deleted');
        this.load();
      }
    });
  }
}

@Component({
  selector: 'app-follow-up-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.id ? 'Edit Follow Up' : 'Add Follow Up' }}</h2>
    <form [formGroup]="form" mat-dialog-content>
      <p class="dialog-subtitle">Plan the next customer touchpoint and keep the activity timeline current.</p>
      <div class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Customer Lead</mat-label>
          <mat-select formControlName="customerLeadId">
            <mat-option *ngFor="let lead of leads" [value]="lead.id">{{ lead.customerName }}</mat-option>
          </mat-select>
          <mat-error>Customer lead is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Follow Up Date</mat-label>
          <input matInput [matDatepicker]="followDate" formControlName="followUpDate">
          <mat-datepicker-toggle matSuffix [for]="followDate"></mat-datepicker-toggle>
          <mat-datepicker #followDate></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Next Follow Up</mat-label>
          <input matInput [matDatepicker]="nextDate" formControlName="nextFollowUpDate">
          <mat-datepicker-toggle matSuffix [for]="nextDate"></mat-datepicker-toggle>
          <mat-datepicker #nextDate></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option *ngFor="let status of statuses" [value]="status">{{ status }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Discussion</mat-label>
          <textarea matInput rows="4" formControlName="discussion"></textarea>
          <mat-error>Discussion is required</mat-error>
        </mat-form-field>
      </div>
    </form>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid || saving">Save</button>
    </div>
  `,
  styles: [`
    .dialog-subtitle { margin: 0 0 16px; color: #667085; line-height: 1.5; }
  `]
})
export class FollowUpDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(FollowUpService);
  private readonly leadService = inject(CustomerLeadService);
  private readonly dialogRef = inject(MatDialogRef<FollowUpDialogComponent>);
  private readonly notifications = inject(NotificationService);

  saving = false;
  leads: CustomerLead[] = [];
  statuses = ['FOLLOW_UP', 'CONTACTED', 'INTERESTED', 'NEGOTIATION', 'VISIT_SCHEDULED', 'CLOSED_WON', 'CLOSED_LOST'];

  form = this.fb.nonNullable.group({
    customerLeadId: [this.data?.customerLeadId ?? 0, [Validators.required, Validators.min(1)]],
    followUpDate: [this.toDate(this.data?.followUpDate) ?? new Date(), Validators.required],
    nextFollowUpDate: [this.toDate(this.data?.nextFollowUpDate)],
    discussion: [this.data?.discussion ?? '', Validators.required],
    status: [this.data?.status ?? 'FOLLOW_UP', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data?: FollowUp) {}

  ngOnInit(): void {
    this.leadService.list().subscribe({ next: (leads) => this.leads = leads });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const raw = this.form.getRawValue();
    const payload: FollowUp = {
      ...this.data,
      ...raw,
      followUpDate: this.toIsoDate(raw.followUpDate),
      nextFollowUpDate: raw.nextFollowUpDate ? this.toIsoDate(raw.nextFollowUpDate) : undefined
    };
    const request = this.data?.id
      ? this.service.update(this.data.id, payload)
      : this.service.create(payload);

    request.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.notifications.success('Follow up saved');
        this.dialogRef.close(true);
      }
    });
  }

  private toDate(value?: string): Date | null {
    return value ? new Date(value) : null;
  }

  private toIsoDate(value: Date): string {
    return value.toISOString().slice(0, 10);
  }
}
