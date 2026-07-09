import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';

import { LeadType } from '../../core/models/lead-type.model';
import { LeadTypeService } from '../../core/services/lead-type.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-lead-types',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule],
  template: `
    <header class="page-header">
      <div>
        <h1>Lead Types</h1>
        <p>Manage categories used to classify customer leads.</p>
      </div>
      <button mat-raised-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon>
        Add Lead Type
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
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row">
              <div class="entity-cell">
                <span class="entity-icon"><mat-icon>category</mat-icon></span>
                <strong>{{ row.name }}</strong>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let row">{{ row.description || '-' }}</td>
          </ng-container>
          <ng-container matColumnDef="active">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row"><span class="status-chip">{{ row.active === false ? 'Inactive' : 'Active' }}</span></td>
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
        <div class="empty-state" *ngIf="!filteredData.length">No lead types found.</div>
      </div>
    </section>
  `,
  styles: [`
    .entity-cell { display: flex; align-items: center; gap: 12px; }
    .entity-icon { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 8px; background: #e8f2ff; color: #175cd3; }
    .entity-icon mat-icon { font-size: 21px; width: 21px; height: 21px; }
  `]
})
export class LeadTypesComponent implements OnInit {
  private readonly service = inject(LeadTypeService);
  private readonly dialog = inject(MatDialog);
  private readonly notifications = inject(NotificationService);

  columns = ['name', 'description', 'active', 'actions'];
  data: LeadType[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().subscribe({ next: (data) => this.data = data });
  }

  get filteredData(): LeadType[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.data;
    }

    return this.data.filter((row) =>
      [row.name, row.description, row.active === false ? 'inactive' : 'active']
        .some((value) => `${value ?? ''}`.toLowerCase().includes(term))
    );
  }

  openForm(row?: LeadType): void {
    this.dialog.open(LeadTypeDialogComponent, { width: '620px', data: row }).afterClosed().subscribe((saved) => {
      if (saved) {
        this.load();
      }
    });
  }

  remove(row: LeadType): void {
    if (!row.id || !confirm(`Delete ${row.name}?`)) {
      return;
    }

    this.service.delete(row.id).subscribe({
      next: () => {
        this.notifications.success('Lead type deleted');
        this.load();
      }
    });
  }
}

@Component({
  selector: 'app-lead-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.id ? 'Edit Lead Type' : 'Add Lead Type' }}</h2>
    <form [formGroup]="form" (ngSubmit)="save()" mat-dialog-content>
      <p class="dialog-subtitle">Define the categories your sales team uses to segment incoming leads.</p>
      <div class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name">
          <mat-error>Name is required</mat-error>
        </mat-form-field>
        <mat-checkbox formControlName="active">Active</mat-checkbox>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Description</mat-label>
          <textarea matInput rows="4" formControlName="description"></textarea>
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
    mat-checkbox { align-self: center; min-height: 56px; display: flex; align-items: center; }
  `]
})
export class LeadTypeDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(LeadTypeService);
  private readonly dialogRef = inject(MatDialogRef<LeadTypeDialogComponent>);
  private readonly notifications = inject(NotificationService);

  saving = false;

  form = this.fb.nonNullable.group({
    name: [this.data?.name ?? '', Validators.required],
    description: [this.data?.description ?? ''],
    active: [this.data?.active ?? true]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data?: LeadType) {}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = { ...this.data, ...this.form.getRawValue() };
    const request = this.data?.id
      ? this.service.update(this.data.id, payload)
      : this.service.create(payload);

    request.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.notifications.success('Lead type saved');
        this.dialogRef.close(true);
      }
    });
  }
}
