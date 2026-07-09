export interface CustomerLead {
  id?: number;
  customerName: string;
  mobile: string;
  alternateNumber?: string;
  email?: string;
  leadTypeId?: number;
  city?: string;
  address?: string;
  requirement?: string;
  leadSource?: string;
  assignedExecutiveId?: number;
  discussionDetails?: string;
  visitDate?: string;
  nextFollowUpDate?: string;
  status?: string;
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
}
