import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Proposal } from 'src/app/models/proposal.model';
import { ProposalService } from 'src/app/services/proposals/proposal.service';
import { ViewProposalComponent } from 'src/app/shared/view-proposal/view-proposal.component';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.page.html',
  styleUrls: ['./proposals.page.scss'],
  standalone: false,
})
export class ProposalsPage implements OnInit {
  proposals!: Proposal[];
  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private proposalService: ProposalService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.proposals = data['proposals']));
  }

  async openProposal(proposal: Proposal) {
    const modal = await this.modalController.create({
      component: ViewProposalComponent,
      componentProps: { proposal },
    });

    modal.onDidDismiss().then((result) => {
      result.data &&
        this.proposalService.updateProposal(result.data).subscribe({
          next: (updatedProposal) =>
            (this.proposals = this.proposals.map((p) =>
              p.id === updatedProposal.id ? updatedProposal : p
            )),
          error: (error) => console.error('Error creating event:', error),
          complete: () => console.log('Event created successfully!'),
        });
    });

    return await modal.present();
  }
}
