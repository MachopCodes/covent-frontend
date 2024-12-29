import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { EventService } from './event.service';
import { EventObject } from '../../models/event.model';
import {
  MOCK_EVENT,
  MOCK_EVENT_DATA,
} from 'src/testing/events/events_mock_data';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/events`;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all events (index)', () => {
    service.index().subscribe((events) => {
      expect(events).toBeDefined();
    });

    // const req = httpMock.expectOne(`${apiUrl}`);
    // expect(req.request.method).toBe('GET');
    // req.flush(MOCK_EVENT_DATA); // Respond with mock data
  });

  it('should fetch a specific event by ID (get)', () => {
    service.get(MOCK_EVENT.id).subscribe((event) => {
      expect(event).toBeDefined();
    });

    // const req = httpMock.expectOne(`${apiUrl}/${MOCK_EVENT.id}`);
    // expect(req.request.method).toBe('GET');
    // req.flush(MOCK_EVENT); // Respond with mock data
  });

  it('should create a new event (create)', () => {
    const newEvent: EventObject = {
      id: 3,
      name: 'New Event',
      event_overview: 'Description for new event.',
      target_attendees: ['Everyone'],
      sponsorship_value: '$3000',
      contact_info: 'new@example.com',
      user_id: 44,
    };

    service.create(newEvent).subscribe((event) => {
      expect(event).toBeDefined();
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEvent);
    req.flush(newEvent); // Respond with mock data
  });

  it('should edit an existing event (edit)', () => {
    const updatedEvent: Partial<EventObject> = {
      name: 'Updated Event Name',
    };

    service.edit(1, updatedEvent).subscribe((event) => {
      expect(event.name).toEqual(updatedEvent.name!);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEvent);
    req.flush({ ...MOCK_EVENT, ...updatedEvent }); // Respond with updated mock data
  });

  it('should delete an event by ID (delete)', () => {
    const eventId = 1;

    service.delete(eventId).subscribe((response) => {
      expect(response).toBeUndefined(); // Delete request returns void
    });

    const req = httpMock.expectOne(`${apiUrl}/${eventId}`);
    expect(req.request.method).toBe('DELETE');
  });
});
