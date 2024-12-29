import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProposalCreateRequest } from 'src/app/models/proposal.model';
import { ProposalService } from 'src/app/services/proposals/proposal.service';
import { Sponsor } from 'src/app/models/sponsor.model';
import { EventService } from 'src/app/services/events/event.service';
import { EventObject } from 'src/app/models/event.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html',
  styleUrls: ['./proposal-create.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    RouterModule,
  ],
})
export class CreateProposalDialogComponent implements OnInit {
  @Input() sponsor!: Sponsor; // Sponsor data passed from parent
  proposalForm!: FormGroup; // Reactive form
  events: EventObject[] = []; // List of events to choose from

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.eventService.index().subscribe({
      next: (events) => (this.events = events),
      error: (error) => console.error('Error fetching events:', error),
      complete: () => null,
    });
  }

  // Initialize the form with default values and validators
  private initializeForm(): void {
    this.proposalForm = this.formBuilder.group({
      event_id: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      contactInfo: ['', [Validators.required, Validators.email]],
    });
  }

  // Close the modal
  dismiss(): void {
    this.modalController.dismiss();
  }

  // Submit the form and create the proposal
  submitProposal(): void {
    if (this.proposalForm.valid) {
      const formValues = this.proposalForm.value;

      const proposal: ProposalCreateRequest = {
        event_id: formValues.event_id,
        sponsor_id: this.sponsor.id,
        owner_id: 1, // Replace with logged-in user's ID
        notes: formValues.notes,
        contact_info: formValues.contactInfo,
        status: 'Pending',
        event_snapshot: {
          name: '',
          date: '',
        },
        sponsor_snapshot: {
          name: this.sponsor.name,
          company_name: this.sponsor.company_name,
        },
      };

      this.proposalService.createProposal(proposal).subscribe({
        next: (response) => this.modalController.dismiss(response),
        error: (error) => console.error('Error creating proposal:', error),
        complete: () => null,
      });
    }
  }
}
