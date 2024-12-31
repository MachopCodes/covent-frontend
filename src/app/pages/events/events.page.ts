import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventObject } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/events/event.service';
import { EditEventModalComponent } from 'src/app/shared/edit-event-modal/edit-event-modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: false,
})
export class EventsPage implements OnInit {
  eventData!: EventObject[];
  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.eventData = data['events']));
  }

  async openEventModal(event?: EventObject) {
    const modal = await this.modalController.create({
      component: EditEventModalComponent,
      componentProps: {},
    });

    modal.onDidDismiss().then((result) => {
      result.data &&
        this.eventService.create(result.data).subscribe({
          next: (updatedEvent) =>
            (this.eventData = [...this.eventData, updatedEvent]),
          error: (error) => console.error('Error creating event:', error),
          complete: () => console.log('Event created successfully!'),
        });
    });

    return await modal.present();
  }
}
