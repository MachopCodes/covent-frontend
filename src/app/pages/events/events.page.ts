import { Component, OnInit } from '@angular/core';
import { EventObject } from 'src/app/models/event.model';
import { MOCK_EVENT_DATA } from 'src/testing/events_mock_data';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: false,
})
export class EventsPage implements OnInit {
  eventData: EventObject[] = MOCK_EVENT_DATA;
  constructor() {}

  ngOnInit() {}
}
