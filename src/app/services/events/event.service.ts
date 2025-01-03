import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventObject } from '../../models/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/events/`;

  constructor(private http: HttpClient) {}

  // Get all events
  index(): Observable<EventObject[]> {
    return this.http.get<EventObject[]>(`${this.apiUrl}`);
  }

  // GET my events
  getMyEvents(): Observable<EventObject[]> {
    return this.http.get<EventObject[]>(`${this.apiUrl}mine`);
  }

  // Get a specific event by ID
  get(id: number): Observable<EventObject> {
    return this.http.get<EventObject>(`${this.apiUrl}${id}`);
  }

  // Create a new event
  create(event: EventObject): Observable<EventObject> {
    return this.http.post<EventObject>(`${this.apiUrl}`, event);
  }

  // Edit an existing event
  edit(id: number, event: Partial<EventObject>): Observable<EventObject> {
    return this.http.put<EventObject>(`${this.apiUrl}${id}`, event);
  }

  // Delete an event by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
