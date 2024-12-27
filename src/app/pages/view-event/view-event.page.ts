import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventObject } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/events/event.service';
import { EditEventModalComponent } from 'src/app/shared/edit-event-modal/edit-event-modal.component';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
  standalone: false,
})
export class ViewEventPage implements OnInit {
  event!: EventObject;
  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.event = data['event']));
  }

  async openEventModal(event?: EventObject) {
    const modal = await this.modalController.create({
      component: EditEventModalComponent,
      componentProps: { event }, // Pass event if editing; pass nothing if creating
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        if (event) {
          this.eventService.edit(event.id, result.data).subscribe({
            next: (updatedEvent) => (this.event = updatedEvent),
            error: (error) => console.error('Error updating event:', error),
            complete: () => console.log('Event updated successfully!'),
          });
        } else {
          // Create a new event
          console.log('New Event Created:', result.data);
          // Add the new event to your data or send it to the backend
        }
      }
    });

    return await modal.present();
  }
}
