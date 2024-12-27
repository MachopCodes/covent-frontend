export interface EventObject {
  id: number;
  name: string;
  event_overview: string;
  target_attendees: string[];
  sponsorship_value: string;
  contact_info: string;
  date?: string;
  location?: string;
  user_id: number;
}
