import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventObject } from 'src/app/models/event.model';
import { ErrorService } from 'src/app/services/error/error.service';
import { EventService } from 'src/app/services/events/event.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
    private eventService: EventService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.eventData = data['events']));
  }

  async openEventModal() {
    const modal = await this.modalController.create({
      component: EditEventModalComponent,
    });

    modal
      .onDidDismiss()
      .then((result) => result.data && this.createEvent(result.data));

    return await modal.present();
  }

  private createEvent(event: EventObject) {
    this.loaderService.show();
    this.eventService.create(event).subscribe({
      next: (updatedEvent) =>
        (this.eventData = [...this.eventData, updatedEvent]),
      error: (error) => this.errorService.handleError(error),
      complete: () => this.loaderService.hide(),
    });
  }
}
