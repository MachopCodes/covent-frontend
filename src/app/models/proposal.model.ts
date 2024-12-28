export interface Proposal {
  id: number;
  event_id: number;
  sponsor_id: number;
  owner_id: number;
  notes: string;
  contact_info: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  event_snapshot: { name: string; date: string };
  sponsor_snapshot: { name: string; company_name: string };
}

export interface ProposalCreateRequest {
  event_id: number;
  sponsor_id: number;
  owner_id: number;
  notes: string;
  contact_info: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  event_snapshot: { name: string; date: string };
  sponsor_snapshot: { name: string; company_name: string };
}
