import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventObject } from '../../models/event.model';
import { environment } from 'src/environments/environment';
import { MOCK_EVENT } from 'src/testing/events/events.mock';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all events
  index(): Observable<EventObject[]> {
    return this.http.get<EventObject[]>(`${this.apiUrl}/events`);
  }

  // Get a specific event by ID
  get(id: number): Observable<EventObject> {
    return this.http.get<EventObject>(`${this.apiUrl}/events/${id}`);
  }

  // Create a new event
  create(event: EventObject): Observable<EventObject> {
    return this.http.post<EventObject>(`${this.apiUrl}/events`, event);
  }

  // Edit an existing event
  edit(id: number, event: Partial<EventObject>): Observable<EventObject> {
    return this.http.put<EventObject>(`${this.apiUrl}/events/${id}`, event);
  }

  // Delete an event by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/events/${id}`);
  }
}
