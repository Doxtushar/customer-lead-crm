import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { CustomerLead } from '../../core/models/customer-lead.model';
import { LeadType } from '../../core/models/lead-type.model';
import { User } from '../../core/models/user.model';
import { CustomerLeadService } from '../../core/services/customer-lead.service';
import { LeadTypeService } from '../../core/services/lead-type.service';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-customer-leads',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule],
  template: `
    <header class="page-header">
      <div>
        <h1>Customer Leads</h1>
        <p>Create, qualify, assign, and track customer opportunities.</p>
      </div>
      <button mat-raised-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon>
        Add Lead
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
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row">
              <div class="customer-cell">
                <span class="avatar">{{ initials(row.customerName) }}</span>
                <div>
                  <strong>{{ row.customerName }}</strong>
                  <small>{{ row.email || '-' }}</small>
                </div>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="mobile">
            <th mat-header-cell *matHeaderCellDef>Mobile</th>
            <td mat-cell *matCellDef="let row">{{ row.mobile }}</td>
          </ng-container>
          <ng-container matColumnDef="city">
            <th mat-header-cell *matHeaderCellDef>City</th>
            <td mat-cell *matCellDef="let row">{{ row.city || '-' }}</td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row"><span class="status-chip">{{ row.status || '-' }}</span></td>
          </ng-container>
          <ng-container matColumnDef="priority">
            <th mat-header-cell *matHeaderCellDef>Priority</th>
            <td mat-cell *matCellDef="let row"><span class="priority-badge">{{ row.priority || '-' }}</span></td>
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
        <div class="empty-state" *ngIf="!filteredData.length">No customer leads found.</div>
      </div>
    </section>
  `,
  styles: [`
    .customer-cell { display: flex; align-items: center; gap: 12px; }
    .avatar { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 15px; background: linear-gradient(135deg, #2563eb, #06b6d4, #12b76a); color: #fff; font-size: 13px; font-weight: 900; box-shadow: 0 10px 24px rgba(37,99,235,.22); }
    .customer-cell strong, .customer-cell small { display: block; line-height: 1.35; }
  `]
})
export class CustomerLeadsComponent implements OnInit {
  private readonly service = inject(CustomerLeadService);
  private readonly dialog = inject(MatDialog);
  private readonly notifications = inject(NotificationService);

  columns = ['customerName', 'mobile', 'city', 'status', 'priority', 'actions'];
  data: CustomerLead[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().subscribe({ next: (data) => this.data = data });
  }

  get filteredData(): CustomerLead[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.data;
    }

    return this.data.filter((row) =>
      [
        row.customerName,
        row.mobile,
        row.email,
        row.city,
        row.requirement,
        row.leadSource,
        row.status,
        row.priority
      ].some((value) => `${value ?? ''}`.toLowerCase().includes(term))
    );
  }

  openForm(row?: CustomerLead): void {
    this.dialog.open(CustomerLeadDialogComponent, { width: '820px', data: row }).afterClosed().subscribe((saved) => {
      if (saved) {
        this.load();
      }
    });
  }

  remove(row: CustomerLead): void {
    if (!row.id || !confirm(`Delete ${row.customerName}?`)) {
      return;
    }

    this.service.delete(row.id).subscribe({
      next: () => {
        this.notifications.success('Customer lead deleted');
        this.load();
      }
    });
  }

  initials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'CL';
  }
}

@Component({
  selector: 'app-customer-lead-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.id ? 'Edit Customer Lead' : 'Add Customer Lead' }}</h2>
    <form [formGroup]="form" mat-dialog-content>
      <p class="dialog-subtitle">Capture contact details, qualification status, ownership, and expected value.</p>
      <div class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Customer Name</mat-label>
          <input matInput formControlName="customerName">
          <mat-error>Customer name is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Mobile</mat-label>
          <input matInput formControlName="mobile">
          <mat-error>Mobile is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Alternate Number</mat-label>
          <input matInput formControlName="alternateNumber">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
          <mat-error>Enter a valid email</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Lead Type</mat-label>
          <mat-select formControlName="leadTypeId">
            <mat-option *ngFor="let type of leadTypes" [value]="type.id">{{ type.name }}</mat-option>
          </mat-select>
          <mat-error>Lead type is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Assigned Executive</mat-label>
          <mat-select formControlName="assignedExecutiveId">
            <mat-option *ngFor="let user of users" [value]="user.id">{{ user.fullName }}</mat-option>
          </mat-select>
          <mat-error>Assigned executive is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>City</mat-label>
          <input matInput formControlName="city">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Lead Source</mat-label>
          <input matInput formControlName="leadSource">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option *ngFor="let status of statuses" [value]="status">{{ status }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Priority</mat-label>
          <mat-select formControlName="priority">
            <mat-option *ngFor="let priority of priorities" [value]="priority">{{ priority }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Visit Date</mat-label>
          <input matInput type="date" formControlName="visitDate">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Next Follow Up</mat-label>
          <input matInput type="date" formControlName="nextFollowUpDate">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Requirement</mat-label>
          <textarea matInput rows="3" formControlName="requirement"></textarea>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Discussion Details</mat-label>
          <textarea matInput rows="3" formControlName="discussionDetails"></textarea>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Address</mat-label>
          <textarea matInput rows="2" formControlName="address"></textarea>
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
export class CustomerLeadDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(CustomerLeadService);
  private readonly leadTypeService = inject(LeadTypeService);
  private readonly userService = inject(UserService);
  private readonly dialogRef = inject(MatDialogRef<CustomerLeadDialogComponent>);
  private readonly notifications = inject(NotificationService);

  saving = false;
  leadTypes: LeadType[] = [];
  users: User[] = [];
  statuses = ['NEW', 'CONTACTED', 'INTERESTED', 'FOLLOW_UP', 'VISIT_SCHEDULED', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST', 'NOT_INTERESTED'];
  priorities = ['HOT', 'WARM', 'COLD', 'NOT_A_CUSTOMER'];

  form = this.fb.nonNullable.group({
    customerName: [this.data?.customerName ?? '', Validators.required],
    mobile: [this.data?.mobile ?? '', Validators.required],
    alternateNumber: [this.data?.alternateNumber ?? ''],
    email: [this.data?.email ?? '', Validators.email],
    leadTypeId: [this.data?.leadTypeId ?? null as number | null, Validators.required],
    city: [this.data?.city ?? ''],
    address: [this.data?.address ?? ''],
    requirement: [this.data?.requirement ?? ''],
    leadSource: [this.data?.leadSource ?? ''],
    assignedExecutiveId: [this.data?.assignedExecutiveId ?? null as number | null, Validators.required],
    discussionDetails: [this.data?.discussionDetails ?? ''],
    visitDate: [this.data?.visitDate ?? ''],
    nextFollowUpDate: [this.data?.nextFollowUpDate ?? ''],
    status: [this.data?.status ?? 'NEW', Validators.required],
    priority: [this.data?.priority ?? 'WARM', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data?: CustomerLead) {}

  ngOnInit(): void {
    this.leadTypeService.list().subscribe({ next: (types) => this.leadTypes = types });
    this.userService.list().subscribe({ next: (users) => this.users = users.filter((user) => user.active !== false) });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const raw = this.form.getRawValue();
    const payload: CustomerLead = {
      ...this.data,
      ...raw,
      leadTypeId: raw.leadTypeId ?? undefined,
      assignedExecutiveId: raw.assignedExecutiveId ?? undefined,
      email: raw.email || undefined,
      visitDate: raw.visitDate || undefined,
      nextFollowUpDate: raw.nextFollowUpDate || undefined
    };
    const request = this.data?.id
      ? this.service.update(this.data.id, payload)
      : this.service.create(payload);

    request.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.notifications.success('Customer lead saved');
        this.dialogRef.close(true);
      }
    });
  }
}
