import { Proposal, ProposalCreateRequest } from 'src/app/models/proposal.model';

export const MOCK_PROPOSAL_APPROVED: Proposal = {
  id: 1,
  event_id: 1,
  sponsor_id: 1,
  owner_id: 1,
  notes: 'Test',
  contact_info: '123-232-2343',
  status: 'APPROVED',
  event_snapshot: { name: 'Event Name', date: '2024-01-01' },
  sponsor_snapshot: { name: 'Joe Tom', company_name: 'Smathers n Branson' },
};

export const MOCK_PROPOSAL_PENDING: Proposal = {
  id: 2,
  event_id: 1,
  sponsor_id: 1,
  owner_id: 1,
  notes: 'Test',
  contact_info: '123-232-2343',
  status: 'PENDING',
  event_snapshot: { name: 'Event Name', date: '2024-01-01' },
  sponsor_snapshot: { name: 'Joe Tom', company_name: 'Smathers n Branson' },
};

export const MOCK_PROPOSAL_REJECTED: Proposal = {
  id: 3,
  event_id: 1,
  sponsor_id: 1,
  owner_id: 1,
  notes: 'Test',
  contact_info: '123-232-2343',
  status: 'REJECTED',
  event_snapshot: { name: 'Event Name', date: '2024-01-01' },
  sponsor_snapshot: { name: 'Joe Tom', company_name: 'Smathers n Branson' },
};

export const MOCK_PROPOSAL_CREATE_REQUEST: ProposalCreateRequest = {
  event_id: 1,
  sponsor_id: 1,
  owner_id: 1,
  notes: 'test',
  contact_info: '',
  status: 'APPROVED',
  event_snapshot: {
    name: 'test',
    date: 'test',
  },
  sponsor_snapshot: {
    name: 'test',
    company_name: 'test',
  },
};
