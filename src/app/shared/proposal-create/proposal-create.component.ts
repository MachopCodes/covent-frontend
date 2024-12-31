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
import { ErrorService } from 'src/app/services/error/error.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
    private eventService: EventService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getEvents()
  }

  private getEvents() {
    this.loaderService.show()
    this.eventService.index().subscribe({
      next: (events) => (this.events = events),
      error: (error) => this.errorService.handleError(error),
      complete: () => this.loaderService.hide(),
    });
  }

  // Initialize the form with default values and validators
  private initializeForm(): void {
    this.proposalForm = this.formBuilder.group({
      event: [null, [Validators.required]],
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
        event_id: formValues.event.id,
        sponsor_id: this.sponsor.id,
        owner_id: 1, // Replace with logged-in user's ID
        notes: formValues.notes,
        contact_info: formValues.contactInfo,
        status: 'PENDING',
        event_snapshot: {
          name: formValues.event.name,
          date: formValues.event.date ?? null,
        },
        sponsor_snapshot: {
          name: this.sponsor.name,
          company_name: this.sponsor.company_name,
        },
      };

      this.createProposal(proposal)
      
    }
  }

  private createProposal (req: ProposalCreateRequest) {
    this.loaderService.show()
    this.proposalService.createProposal(req).subscribe({
      next: (response) => this.modalController.dismiss(response),
      error: (error) => this.errorService.handleError(error),
      complete: () => this.loaderService.hide(),
    });

  }
}
