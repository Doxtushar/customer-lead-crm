export interface FollowUp {
  id?: number;
  customerLeadId: number;
  followUpDate: string;
  discussion: string;
  nextFollowUpDate?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
