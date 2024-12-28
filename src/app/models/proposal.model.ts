import { EventObject } from './event.model';

export interface Proposal {
  event_id: EventObject;
  sponsor_id: number;
  owner_id: number;
  notes: string;
  contact_info: string;
}
