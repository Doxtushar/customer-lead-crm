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
      <mat-card *ngFor="let stat of stats; let index = index" class="stat-card">
        <div class="stat-icon"><mat-icon>{{ stat.icon }}</mat-icon></div>
        <div>
          <span>{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
          <small>Updated from CRM data</small>
        </div>
      </mat-card>
      <mat-card class="stat-card skeleton-card" *ngIf="!stats.length">
        <div class="skeleton-icon"></div>
        <div>
          <span class="skeleton-line short"></span>
          <strong class="skeleton-line"></strong>
        </div>
      </mat-card>
    </section>

    <section class="chart-grid mt-3">
      <div class="panel chart-panel">
        <div class="table-toolbar">
          <strong>Lead Status</strong>
          <span class="panel-chip">Pipeline mix</span>
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
          <span class="panel-chip">Activity health</span>
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
        <span class="panel-chip">Trend</span>
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
        <strong>Recent Activity</strong>
        <span class="panel-chip">Live feed</span>
      </div>
      <div class="timeline">
        <div class="timeline-item" *ngFor="let lead of summary?.recentLeads ?? []">
          <span class="timeline-dot"></span>
          <div>
            <strong>{{ lead.customerName }}</strong>
            <p><span class="status-chip">{{ lead.status }}</span> created {{ lead.createdAt | date:'mediumDate' }}</p>
          </div>
        </div>
        <div class="empty-state" *ngIf="!(summary?.recentLeads?.length)">No recent activity yet.</div>
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
    .stat-card { position: relative; overflow: hidden; display: flex; flex-direction: row; gap: 14px; align-items: center; min-height: 134px; padding: 20px; border: 1px solid rgba(255,255,255,.78); border-radius: 22px; background: rgba(255,255,255,.86); box-shadow: 0 14px 42px rgba(15,23,42,.08); }
    .stat-card::after { content: ''; position: absolute; inset: auto 16px 0 16px; height: 4px; border-radius: 999px 999px 0 0; background: linear-gradient(90deg, #2563eb, #06b6d4); }
    .stat-card:nth-child(2)::after { background: linear-gradient(90deg, #7c3aed, #ec4899); }
    .stat-card:nth-child(3)::after { background: linear-gradient(90deg, #f79009, #ef4444); }
    .stat-card:nth-child(4)::after { background: linear-gradient(90deg, #12b76a, #06b6d4); }
    .stat-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 16px; background: linear-gradient(135deg, #eaf1ff, #ecfeff); color: #175cd3; box-shadow: inset 0 0 0 1px rgba(37,99,235,.12); }
    .stat-card mat-icon { font-size: 26px; width: 26px; height: 26px; margin: 0; }
    .stat-card span { display: block; color: #667085; font-size: 13px; }
    .stat-card strong { display: block; margin-top: 4px; font-size: 28px; color: #111827; letter-spacing: 0; }
    .stat-card small { display: block; margin-top: 6px; color: #98a2b3; font-size: 12px; font-weight: 700; }
    .skeleton-card { animation: pulse 1.3s ease-in-out infinite; }
    .skeleton-icon, .skeleton-line { display: block; border-radius: 999px; background: linear-gradient(90deg, #eef2f7, #f8fafc, #eef2f7); }
    .skeleton-icon { width: 48px; height: 48px; border-radius: 16px; }
    .skeleton-line { width: 150px; height: 18px; margin-top: 10px; }
    .skeleton-line.short { width: 94px; height: 13px; }
    .chart-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(280px, .8fr); gap: 16px; }
    .chart-panel { min-height: 280px; }
    .panel-chip { display: inline-flex; align-items: center; min-height: 28px; padding: 0 10px; border-radius: 999px; background: #eef6ff; color: #175cd3; font-size: 12px; font-weight: 900; }
    .bar-chart { display: grid; gap: 14px; padding: 18px; }
    .bar-row { display: grid; grid-template-columns: 120px 1fr 42px; gap: 12px; align-items: center; }
    .bar-row span { color: #475467; font-weight: 600; overflow-wrap: anywhere; }
    .bar-row strong { text-align: right; }
    .track { height: 12px; overflow: hidden; border-radius: 999px; background: #edf2f7; box-shadow: inset 0 1px 2px rgba(15,23,42,.06); }
    .track i { display: block; height: 100%; min-width: 4px; border-radius: inherit; background: linear-gradient(90deg, #2563eb, #06b6d4, #12b76a); box-shadow: 0 6px 18px rgba(37,99,235,.24); }
    .donut-wrap { min-height: 220px; display: grid; place-items: center; gap: 14px; padding: 20px; }
    .donut { width: 166px; height: 166px; display: grid; place-items: center; border-radius: 50%; position: relative; box-shadow: 0 16px 44px rgba(15,23,42,.12); }
    .donut::after { content: ''; position: absolute; inset: 26px; border-radius: 50%; background: #fff; box-shadow: inset 0 0 0 1px rgba(126,143,166,.12); }
    .donut span { position: relative; z-index: 1; font-size: 30px; font-weight: 800; color: #111827; }
    .legend { display: flex; gap: 18px; color: #475467; font-weight: 600; }
    .legend span { display: inline-flex; align-items: center; gap: 6px; }
    .legend i { width: 10px; height: 10px; border-radius: 50%; }
    .legend .pending { background: #f97316; }
    .legend .completed { background: #22c55e; }
    .column-chart { min-height: 280px; display: flex; align-items: flex-end; gap: 14px; padding: 24px 18px 18px; overflow-x: auto; }
    .column { min-width: 64px; height: 220px; display: grid; grid-template-rows: 24px 1fr 24px; align-items: flex-end; justify-items: center; color: #475467; font-weight: 700; }
    .column i { width: 38px; min-height: 5px; border-radius: 999px 999px 8px 8px; background: linear-gradient(180deg, #67e8f9, #2563eb); box-shadow: 0 8px 18px rgba(37,99,235,.18); }
    .column span { align-self: center; font-size: 12px; white-space: nowrap; }
    .timeline { display: grid; padding: 8px 22px 20px; }
    .timeline-item { position: relative; display: grid; grid-template-columns: 24px 1fr; gap: 12px; padding: 16px 0; border-bottom: 1px solid #edf1f7; }
    .timeline-item:last-child { border-bottom: 0; }
    .timeline-dot { width: 12px; height: 12px; margin-top: 6px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #12b76a); box-shadow: 0 0 0 6px #eef6ff; }
    .timeline-item strong { display: block; color: #111827; }
    .timeline-item p { margin: 6px 0 0; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; color: #667085; }
    @media (max-width: 1100px) { .stats { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 900px) { .chart-grid { grid-template-columns: 1fr; } }
    @media (max-width: 620px) {
      .stats { grid-template-columns: 1fr; }
      .bar-row { grid-template-columns: 1fr; gap: 6px; }
      .bar-row strong { text-align: left; }
    }
    @keyframes pulse { 50% { opacity: .62; } }
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
