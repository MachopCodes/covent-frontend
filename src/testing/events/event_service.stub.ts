import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { MOCK_EVENT_DATA } from 'src/testing/events/events.mock';
import { EventObject } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventServiceStub {
  // Get all events
  index(): Observable<EventObject[]> {
    return of(MOCK_EVENT_DATA); // MOCK
  }

  // Get a specific event by ID
  get(id: number): Observable<EventObject> {
    return of(MOCK_EVENT_DATA[0]); // MOCK
  }

  // Create a new event
  create(event: EventObject): Observable<EventObject> {
    return of(MOCK_EVENT_DATA[0]); // MOCK
  }

  // Edit an existing event
  edit(id: number, event: Partial<EventObject>): Observable<EventObject> {
    return of(MOCK_EVENT_DATA[0]); // MOCK
  }

  // Delete an event by ID
  delete(id: number): Observable<void> {
    return of(); // MOCK
  }
}
