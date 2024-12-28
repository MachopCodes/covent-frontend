import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Sponsor } from 'src/app/models/sponsor.model';
import { CreateProposalDialogComponent } from 'src/app/shared/proposal-create/proposal-create.component';

@Component({
  selector: 'app-view-sponsor',
  templateUrl: './view-sponsor.page.html',
  styleUrls: ['./view-sponsor.page.scss'],
  standalone: false,
})
export class ViewSponsorPage implements OnInit {
  sponsor!: Sponsor;
  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.sponsor = data['sponsor']));
  }

  async createProposal() {
    const modal = await this.modalController.create({
      component: CreateProposalDialogComponent,
    });
    return await modal.present();
  }
}
