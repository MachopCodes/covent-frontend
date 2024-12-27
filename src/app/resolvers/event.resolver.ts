import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EventObject } from '../models/event.model';
import { EventService } from '../services/events/event.service';

export const eventIndexResolver: ResolveFn<EventObject[]> = () => {
  return inject(EventService).index();
};

export const eventGetResolver: ResolveFn<EventObject> = (route) => {
  const eventId = route.paramMap.get('id');
  if (!eventId) throw new Error('Event ID is required');
  return inject(EventService).get(Number(eventId));
};
