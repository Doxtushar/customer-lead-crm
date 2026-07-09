export interface DashboardSummary {
  totalLeads: number;
  activeLeadTypes: number;
  pendingFollowUps: number;
  completedFollowUps: number;
  notesCount: number;
  remindersDue: number;
  conversionRate?: number;
  leadStatusCounts?: Record<string, number>;
  followUpStatusCounts?: Record<string, number>;
  monthlyLeadCounts?: Array<{
    label: string;
    count: number;
  }> | Record<string, number>;
  recentLeads?: Array<{
    id?: number;
    customerName: string;
    status?: string;
    createdAt?: string;
  }>;
}
