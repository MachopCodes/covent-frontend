import { EventObject } from 'src/app/models/event.model';

export const MOCK_EVENT: EventObject = {
  id: 1,
  name: 'Test event',
  event_overview: 'overview',
  target_attendees: ['anyone'],
  sponsorship_value: 'test test',
  contact_info: '2342343231',
  user_id: 1,
};

export const MOCK_EVENT_DATA: EventObject[] = [MOCK_EVENT];
