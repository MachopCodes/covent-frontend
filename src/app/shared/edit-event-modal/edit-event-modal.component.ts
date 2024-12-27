import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventObject } from 'src/app/models/event.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    RouterModule,
  ],
})
export class EditEventModalComponent {
  @Input() event?: EventObject; // Optional event object for editing
  eventForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize the form, populate it if an event is provided
    this.eventForm = this.formBuilder.group({
      name: [
        this.event?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      date: [this.event?.date || '', Validators.required],
      location: [this.event?.location || ''],
      target_attendees: [
        this.event?.target_attendees || '',
        Validators.required,
      ],
      event_overview: [this.event?.event_overview || '', Validators.required],
      sponsorship_value: [
        this.event?.sponsorship_value || '',
        [Validators.required, Validators.min(0)],
      ],
      contact_info: [
        this.event?.contact_info || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const updatedEvent = { ...this.event, ...this.eventForm.value };
      this.modalController.dismiss(updatedEvent); // Return the event data (updated or new)
    }
  }
}
