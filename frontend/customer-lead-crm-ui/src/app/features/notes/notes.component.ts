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
import { Note } from '../../core/models/note.model';
import { CustomerLeadService } from '../../core/services/customer-lead.service';
import { NoteService } from '../../core/services/note.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule],
  template: `
    <header class="page-header">
      <div>
        <h1>Notes</h1>
        <p>Capture customer context, decisions, and activity notes.</p>
      </div>
      <button mat-raised-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon>
        Add Note
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
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let row">
              <div class="note-title">
                <span><mat-icon>sticky_note_2</mat-icon></span>
                <strong>{{ noteTitle(row) }}</strong>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="customerName">
            <th mat-header-cell *matHeaderCellDef>Customer</th>
            <td mat-cell *matCellDef="let row">{{ customerName(row.customerLeadId) }}</td>
          </ng-container>
          <ng-container matColumnDef="content">
            <th mat-header-cell *matHeaderCellDef>Content</th>
            <td mat-cell *matCellDef="let row"><span class="note-preview">{{ row.content }}</span></td>
          </ng-container>
          <ng-container matColumnDef="updatedAt">
            <th mat-header-cell *matHeaderCellDef>Updated</th>
            <td mat-cell *matCellDef="let row">{{ row.updatedAt || row.createdAt | date:'mediumDate' }}</td>
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
        <div class="empty-state" *ngIf="!filteredData.length">No notes found.</div>
      </div>
    </section>
  `,
  styles: [`
    .note-title { display: flex; align-items: center; gap: 12px; }
    .note-title span { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 14px; background: linear-gradient(135deg, #fff7ed, #fff0f0); color: #c2410c; box-shadow: inset 0 0 0 1px rgba(247,144,9,.14); }
    .note-title mat-icon { font-size: 21px; width: 21px; height: 21px; }
    @media (max-width: 720px) { .note-preview { max-width: 260px; } }
  `]
})
export class NotesComponent implements OnInit {
  private readonly service = inject(NoteService);
  private readonly leadService = inject(CustomerLeadService);
  private readonly dialog = inject(MatDialog);
  private readonly notifications = inject(NotificationService);

  columns = ['title', 'customerName', 'content', 'updatedAt', 'actions'];
  data: Note[] = [];
  leads: CustomerLead[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.load();
    this.leadService.list().subscribe({ next: (leads) => this.leads = leads });
  }

  load(): void {
    this.service.list().subscribe({ next: (data) => this.data = data });
  }

  get filteredData(): Note[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.data;
    }

    return this.data.filter((row) =>
      [this.noteTitle(row), this.customerName(row.customerLeadId), row.content]
        .some((value) => `${value ?? ''}`.toLowerCase().includes(term))
    );
  }

  customerName(customerLeadId: number): string {
    return this.leads.find((lead) => lead.id === customerLeadId)?.customerName ?? `Lead #${customerLeadId}`;
  }

  noteTitle(row: Note): string {
    const firstLine = row.content.split(/\r?\n/).find(Boolean) ?? 'Note';
    return firstLine.length > 48 ? `${firstLine.slice(0, 45)}...` : firstLine;
  }

  openForm(row?: Note): void {
    this.dialog.open(NoteDialogComponent, { width: '760px', data: row }).afterClosed().subscribe((saved) => {
      if (saved) {
        this.load();
      }
    });
  }

  remove(row: Note): void {
    if (!row.id || !confirm(`Delete this note?`)) {
      return;
    }

    this.service.delete(row.id).subscribe({
      next: () => {
        this.notifications.success('Note deleted');
        this.load();
      }
    });
  }
}

@Component({
  selector: 'app-note-dialog',
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
    <h2 mat-dialog-title>{{ data?.id ? 'Edit Note' : 'Add Note' }}</h2>
    <form [formGroup]="form" mat-dialog-content>
      <p class="dialog-subtitle">Keep customer decisions, objections, and context easy to find.</p>
      <div class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Customer Lead</mat-label>
          <mat-select formControlName="customerLeadId">
            <mat-option *ngFor="let lead of leads" [value]="lead.id">{{ lead.customerName }}</mat-option>
          </mat-select>
          <mat-error>Customer lead is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Content</mat-label>
          <textarea matInput rows="6" formControlName="content"></textarea>
          <mat-error>Content is required</mat-error>
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
export class NoteDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(NoteService);
  private readonly leadService = inject(CustomerLeadService);
  private readonly dialogRef = inject(MatDialogRef<NoteDialogComponent>);
  private readonly notifications = inject(NotificationService);

  saving = false;
  leads: CustomerLead[] = [];

  form = this.fb.nonNullable.group({
    customerLeadId: [this.data?.customerLeadId ?? 0, [Validators.required, Validators.min(1)]],
    content: [this.data?.content ?? '', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data?: Note) {}

  ngOnInit(): void {
    this.leadService.list().subscribe({ next: (leads) => this.leads = leads });
  }

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
        this.notifications.success('Note saved');
        this.dialogRef.close(true);
      }
    });
  }
}
