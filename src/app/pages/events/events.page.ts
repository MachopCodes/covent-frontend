import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventObject } from 'src/app/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: false,
})
export class EventsPage implements OnInit {
  eventData!: EventObject[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.eventData = data['events']));
  }
}
