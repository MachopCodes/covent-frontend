import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Proposal } from 'src/app/models/proposal.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
  myProposals!: Proposal[];
  proposalsForMe!: Proposal[];
  userId!: string;
  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private proposalService: ProposalService,
    private loaderService: LoaderService,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUser()!;
    this.route.data.subscribe((data) => {
      this.proposals = data['proposals'];
      this.myProposals = [];
      this.proposalsForMe = [];
      this.proposals.forEach((proposal) => {
        if (proposal.owner_id === +this.userId) {
          this.myProposals.push(proposal);
        } else {
          this.proposalsForMe.push(proposal);
        }
      });
    });
  }

  async openProposal(proposal: Proposal) {
    const modal = await this.modalController.create({
      component: ViewProposalComponent,
      componentProps: { proposal },
    });

    modal.onDidDismiss().then((result) => {
      result.data && this.updateProposal(result.data);
    });

    return await modal.present();
  }

  private updateProposal(proposal: Proposal) {
    this.loaderService.show();
    this.proposalService.updateProposal(proposal).subscribe({
      next: (updatedProposal) =>
        (this.proposals = this.proposals.map((p) =>
          p.id === updatedProposal.id ? updatedProposal : p
        )),
      error: (error) => this.errorService.handleError(error),
      complete: () => this.loaderService.hide(),
    });
  }
}
