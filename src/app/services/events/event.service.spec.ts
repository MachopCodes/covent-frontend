import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventService } from './event.service';
import { EventObject } from '../../models/event.model';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'https://api.example.com'; // Replace with your actual mock API URL
  const mockEvents: EventObject[] = [
    {
      id: 1,
      name: 'Tech Conference',
      event_overview: 'A conference about tech.',
      target_attendees: ['Developers', 'Managers'],
      sponsorship_value: '$10000',
      contact_info: 'contact@example.com',
      date: '2023-12-01',
      location: 'New York',
      user_id: 42,
    },
    {
      id: 2,
      name: 'Startup Meetup',
      event_overview: 'Meetup for startups.',
      target_attendees: ['Entrepreneurs', 'Investors'],
      sponsorship_value: '$5000',
      contact_info: 'info@startup.com',
      user_id: 43,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EventService,
        { provide: 'apiUrl', useValue: mockApiUrl }, // Mock the API URL
      ],
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
      expect(events).toEqual(mockEvents);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/events`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents); // Respond with mock data
  });

  it('should fetch a specific event by ID (get)', () => {
    const mockEvent = mockEvents[0];

    service.get(mockEvent.id).subscribe((event) => {
      expect(event).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/events/${mockEvent.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent); // Respond with mock data
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
      expect(event).toEqual(newEvent);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/events`);
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

    const req = httpMock.expectOne(`${mockApiUrl}/events/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEvent);
    req.flush({ ...mockEvents[0], ...updatedEvent }); // Respond with updated mock data
  });

  it('should delete an event by ID (delete)', () => {
    const eventId = 1;

    service.delete(eventId).subscribe((response) => {
      expect(response).toBeUndefined(); // Delete request returns void
    });

    const req = httpMock.expectOne(`${mockApiUrl}/events/${eventId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Respond with no content
  });
});
