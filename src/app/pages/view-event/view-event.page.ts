import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventObject } from 'src/app/models/event.model';
import { ErrorService } from 'src/app/services/error/error.service';
import { EventService } from 'src/app/services/events/event.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
    private eventService: EventService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.event = data['event']));
  }

  async openEventModal(event: EventObject) {
    const modal = await this.modalController.create({
      component: EditEventModalComponent,
      componentProps: { event },
    });

    modal
      .onDidDismiss()
      .then((result) => result.data && this.editEvent(result.data));

    return await modal.present();
  }

  private editEvent(event: EventObject) {
    this.loaderService.show();
    this.eventService.edit(event.id, event).subscribe({
      next: (updatedEvent) => (this.event = updatedEvent),
      error: (error) => this.errorService.handleError(error),
      complete: () => this.loaderService.hide(),
    });
  }
}
