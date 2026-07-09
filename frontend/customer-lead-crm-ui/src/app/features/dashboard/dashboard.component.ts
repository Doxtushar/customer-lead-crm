import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { DashboardSummary } from '../../core/models/dashboard.model';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],
  template: `
    <header class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p>Lead pipeline, follow ups, reminders, and activity snapshot.</p>
      </div>
    </header>

    <section class="stats">
      <mat-card *ngFor="let stat of stats" class="stat-card">
        <mat-icon>{{ stat.icon }}</mat-icon>
        <div>
          <span>{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
        </div>
      </mat-card>
    </section>

    <section class="chart-grid mt-3">
      <div class="panel chart-panel">
        <div class="table-toolbar">
          <strong>Lead Status</strong>
        </div>
        <div class="bar-chart">
          <div class="bar-row" *ngFor="let item of leadStatusChart">
            <span>{{ item.label }}</span>
            <div class="track">
              <i [style.width.%]="item.percent"></i>
            </div>
            <strong>{{ item.value }}</strong>
          </div>
          <div class="empty-state" *ngIf="!leadStatusChart.length">No lead chart data.</div>
        </div>
      </div>

      <div class="panel chart-panel">
        <div class="table-toolbar">
          <strong>Follow Up Status</strong>
        </div>
        <div class="donut-wrap">
          <div class="donut" [style.background]="donutBackground">
            <span>{{ summary?.pendingFollowUps ?? 0 }}</span>
          </div>
          <div class="legend">
            <span><i class="pending"></i>Pending</span>
            <span><i class="completed"></i>Completed</span>
          </div>
        </div>
      </div>
    </section>

    <section class="panel mt-3">
      <div class="table-toolbar">
        <strong>Monthly Leads</strong>
      </div>
      <div class="column-chart">
        <div class="column" *ngFor="let item of monthlyChart">
          <strong>{{ item.value }}</strong>
          <i [style.height.%]="item.percent"></i>
          <span>{{ item.label }}</span>
        </div>
        <div class="empty-state" *ngIf="!monthlyChart.length">No monthly chart data.</div>
      </div>
    </section>

    <section class="panel mt-3">
      <div class="table-toolbar">
        <strong>Recent Leads</strong>
      </div>
      <div class="table-wrap">
        <table mat-table [dataSource]="summary?.recentLeads ?? []">
          <ng-container matColumnDef="customerName">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let lead">{{ lead.customerName }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let lead"><span class="status-chip">{{ lead.status }}</span></td>
          </ng-container>

          <ng-container matColumnDef="createdAt">
            <th mat-header-cell *matHeaderCellDef>Created</th>
            <td mat-cell *matCellDef="let lead">{{ lead.createdAt | date:'mediumDate' }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="recentColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: recentColumns;"></tr>
        </table>
        <div class="empty-state" *ngIf="!(summary?.recentLeads?.length)">No recent leads found.</div>
      </div>
    </section>
  `,
  styles: [`
    .stats { display: grid; grid-template-columns: repeat(4, minmax(180px, 1fr)); gap: 16px; }
    .stat-card { display: flex; flex-direction: row; gap: 14px; align-items: center; padding: 18px; border: 1px solid #e1e7ef; border-radius: 8px; box-shadow: 0 18px 48px rgba(15,23,42,.08); }
    .stat-card mat-icon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 8px; background: linear-gradient(135deg, #e8f2ff, #dcfce7); color: #175cd3; font-size: 26px; }
    .stat-card span { display: block; color: #667085; font-size: 13px; }
    .stat-card strong { display: block; margin-top: 4px; font-size: 28px; color: #111827; letter-spacing: 0; }
    .chart-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(280px, .8fr); gap: 16px; }
    .chart-panel { min-height: 280px; }
    .bar-chart { display: grid; gap: 14px; padding: 18px; }
    .bar-row { display: grid; grid-template-columns: 120px 1fr 42px; gap: 12px; align-items: center; }
    .bar-row span { color: #475467; font-weight: 600; overflow-wrap: anywhere; }
    .bar-row strong { text-align: right; }
    .track { height: 12px; overflow: hidden; border-radius: 999px; background: #edf2f7; }
    .track i { display: block; height: 100%; min-width: 4px; border-radius: inherit; background: linear-gradient(90deg, #175cd3, #22c55e); box-shadow: 0 6px 18px rgba(23,92,211,.24); }
    .donut-wrap { min-height: 220px; display: grid; place-items: center; gap: 14px; padding: 20px; }
    .donut { width: 152px; height: 152px; display: grid; place-items: center; border-radius: 50%; position: relative; }
    .donut::after { content: ''; position: absolute; inset: 24px; border-radius: 50%; background: #fff; }
    .donut span { position: relative; z-index: 1; font-size: 30px; font-weight: 800; color: #111827; }
    .legend { display: flex; gap: 18px; color: #475467; font-weight: 600; }
    .legend span { display: inline-flex; align-items: center; gap: 6px; }
    .legend i { width: 10px; height: 10px; border-radius: 50%; }
    .legend .pending { background: #f97316; }
    .legend .completed { background: #22c55e; }
    .column-chart { min-height: 280px; display: flex; align-items: flex-end; gap: 14px; padding: 24px 18px 18px; overflow-x: auto; }
    .column { min-width: 64px; height: 220px; display: grid; grid-template-rows: 24px 1fr 24px; align-items: flex-end; justify-items: center; color: #475467; font-weight: 700; }
    .column i { width: 38px; min-height: 5px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, #22c55e, #175cd3); box-shadow: 0 8px 18px rgba(23,92,211,.18); }
    .column span { align-self: center; font-size: 12px; white-space: nowrap; }
    @media (max-width: 1100px) { .stats { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 900px) { .chart-grid { grid-template-columns: 1fr; } }
    @media (max-width: 620px) {
      .stats { grid-template-columns: 1fr; }
      .bar-row { grid-template-columns: 1fr; gap: 6px; }
      .bar-row strong { text-align: left; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  summary?: DashboardSummary;
  recentColumns = ['customerName', 'status', 'createdAt'];
  stats: Array<{ label: string; value: number | string; icon: string }> = [];
  leadStatusChart: Array<{ label: string; value: number; percent: number }> = [];
  monthlyChart: Array<{ label: string; value: number; percent: number }> = [];
  donutBackground = 'conic-gradient(#f97316 0deg, #22c55e 0deg)';

  ngOnInit(): void {
    this.dashboardService.getSummary().subscribe({
      next: (summary) => {
        this.summary = summary;
        this.stats = [
          { label: 'Total Leads', value: summary.totalLeads ?? 0, icon: 'groups' },
          { label: 'Lead Types', value: summary.activeLeadTypes ?? 0, icon: 'category' },
          { label: 'Pending Follow Ups', value: summary.pendingFollowUps ?? 0, icon: 'event' },
          { label: 'Reminders Due', value: summary.remindersDue ?? 0, icon: 'notifications' },
          { label: 'Completed Follow Ups', value: summary.completedFollowUps ?? 0, icon: 'task_alt' },
          { label: 'Notes', value: summary.notesCount ?? 0, icon: 'notes' },
          { label: 'Conversion Rate', value: `${summary.conversionRate ?? 0}%`, icon: 'trending_up' }
        ];
        this.leadStatusChart = this.toBarChart(summary.leadStatusCounts ?? this.fallbackLeadStatuses(summary));
        this.monthlyChart = this.toMonthlyChart(summary.monthlyLeadCounts ?? {});
        this.donutBackground = this.toDonut(summary.pendingFollowUps ?? 0, summary.completedFollowUps ?? 0);
      }
    });
  }

  private toBarChart(counts: Record<string, number>): Array<{ label: string; value: number; percent: number }> {
    const entries = Object.entries(counts).filter(([, value]) => value > 0);
    const max = Math.max(...entries.map(([, value]) => value), 1);
    return entries.map(([label, value]) => ({
      label,
      value,
      percent: Math.max(6, Math.round((value / max) * 100))
    }));
  }

  private toMonthlyChart(items: Array<{ label: string; count: number }> | Record<string, number>): Array<{ label: string; value: number; percent: number }> {
    const normalizedItems = Array.isArray(items)
      ? items
      : Object.entries(items).map(([label, count]) => ({ label, count }));
    const max = Math.max(...normalizedItems.map((item) => item.count), 1);
    return normalizedItems.map((item) => ({
      label: item.label,
      value: item.count,
      percent: Math.max(4, Math.round((item.count / max) * 100))
    }));
  }

  private toDonut(pending: number, completed: number): string {
    const total = pending + completed;
    if (!total) {
      return 'conic-gradient(#e5e7eb 0deg 360deg)';
    }

    const pendingDegrees = Math.round((pending / total) * 360);
    return `conic-gradient(#f97316 0deg ${pendingDegrees}deg, #22c55e ${pendingDegrees}deg 360deg)`;
  }

  private fallbackLeadStatuses(summary: DashboardSummary): Record<string, number> {
    const recentCounts = (summary.recentLeads ?? []).reduce<Record<string, number>>((counts, lead) => {
      const status = lead.status ?? 'UNKNOWN';
      counts[status] = (counts[status] ?? 0) + 1;
      return counts;
    }, {});

    return Object.keys(recentCounts).length ? recentCounts : { Leads: summary.totalLeads ?? 0 };
  }
}
