import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { EventObject } from 'src/app/models/event.model';
import { Proposal } from 'src/app/models/proposal.model';
import { Sponsor } from 'src/app/models/sponsor.model';
import { ErrorService } from 'src/app/services/error/error.service';
import { EventService } from 'src/app/services/events/event.service';
import { ProposalService } from 'src/app/services/proposals/proposal.service';
import { SponsorService } from 'src/app/services/sponsors/sponsor.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view-proposal',
  templateUrl: './view-proposal.component.html',
  styleUrls: ['./view-proposal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ViewProposalComponent implements OnInit {
  @Input() proposal!: Proposal;
  sponsor!: Sponsor;
  event!: EventObject;
  userId!: string

  constructor(
    private sponsorService: SponsorService,
    private eventService: EventService,
    private modalController: ModalController,
    private proposalService: ProposalService,
    private loaderService: LoaderService,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUser()!
    this.fetchData()
  }

  private fetchData() {
    this.loaderService.show()
    forkJoin({
      sponsor: this.sponsorService.get(this.proposal.sponsor_id),
      event: this.eventService.get(this.proposal.event_id),
    }).subscribe({
      next: ({ sponsor, event }) => {
        this.sponsor = sponsor;
        this.event = event;
      },
      error: (error) => this.errorService.handleError(error),
      complete: () => this.loaderService.hide()
    });
  }

  saveStatus() {
    this.loaderService.show();
    this.proposalService.updateProposal(this.proposal).subscribe({
      next: (updatedProposal) => (this.proposal = updatedProposal),
      error: (error) => this.errorService.handleError(error),
      complete: () => this.loaderService.hide(),
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
